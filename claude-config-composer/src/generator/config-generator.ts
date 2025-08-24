import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { ComponentMerger } from '../merger/component-merger';
import { ConfigMerger } from '../merger/config-merger';
import { ConfigParser } from '../parser/config-parser';
import type { ConfigMetadata } from '../registry/config-registry';
import { InputValidator } from '../utils/input-validator';
import { PathValidator } from '../utils/path-validator';
import { createSpinner } from '../utils/simple-spinner';

export class ConfigGenerator {
  private parser: ConfigParser;
  private componentMerger: ComponentMerger;
  private configMerger: ConfigMerger;

  constructor() {
    this.parser = new ConfigParser();
    this.componentMerger = new ComponentMerger();
    this.configMerger = new ConfigMerger();
  }

  async generateCompleteConfig(
    configs: Array<{ path: string; metadata: ConfigMetadata }>,
    outputDir: string,
    showProgress: boolean = true
  ): Promise<void> {
    // Handle output directory path
    // The outputDir should already be validated and could be absolute or relative
    let resolvedOutputDir = outputDir || '.';

    // Resolve to absolute path for consistent directory creation
    // This ensures both ensureDirectory and generateCompleteConfig use the same path
    let absoluteOutputDir: string;

    if (path.isAbsolute(resolvedOutputDir)) {
      // Already absolute, just normalize it
      absoluteOutputDir = path.normalize(resolvedOutputDir);
    } else {
      // For relative paths, resolve them to absolute paths
      // This ensures consistency with ensureDirectory in generate.ts
      absoluteOutputDir = path.resolve(resolvedOutputDir);
    }

    // Use absoluteOutputDir from here on
    resolvedOutputDir = absoluteOutputDir;

    // Validate input configurations
    try {
      InputValidator.validateArrayBounds(configs, 1, 10, 'configuration');
      for (const config of configs) {
        InputValidator.validateConfigMetadata(config.metadata);
        // Use validateInternalPath for trusted registry paths (which are absolute)
        PathValidator.validateInternalPath(config.path);
      }
    } catch (error) {
      throw new Error(
        `Invalid configuration input: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
    const steps = [
      'Parsing configurations',
      'Creating directory structure',
      'Merging CLAUDE.md',
      'Processing agents',
      'Processing commands',
      'Processing hooks',
      'Generating settings',
      'Finalizing configuration',
      'Validating structure',
    ];

    let currentStep = 0;
    const spinner = showProgress ? createSpinner(steps[currentStep]).start() : null;

    try {
      // Parse all configurations
      const parsedConfigs = await Promise.all(
        configs.map(async config => ({
          metadata: config.metadata,
          parsed: await this.parser.parseConfigDirectory(config.path),
        }))
      );
      if (spinner) spinner.succeed(steps[currentStep]);

      // Create proper directory structure
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);

      // Create directories
      // Since resolvedOutputDir is now always absolute, we can safely join paths
      const claudeDir = path.join(resolvedOutputDir, '.claude');
      const agentsDir = path.join(claudeDir, 'agents');
      const commandsDir = path.join(claudeDir, 'commands');
      const hooksDir = path.join(claudeDir, 'hooks');

      // Create all directories with absolute paths
      // Create parent directory first to ensure it exists
      await fs.mkdir(resolvedOutputDir, { recursive: true });
      await fs.mkdir(claudeDir, { recursive: true });
      await fs.mkdir(agentsDir, { recursive: true });
      await fs.mkdir(commandsDir, { recursive: true });
      await fs.mkdir(hooksDir, { recursive: true });
      if (spinner) spinner.succeed(steps[currentStep]);

      // Merge and write CLAUDE.md at the root of outputDir
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const claudeMdConfigs = parsedConfigs
        .filter(c => c.parsed.claudeMd)
        .map(c => ({
          content: c.parsed.claudeMd || '',
          metadata: c.metadata,
          dependencies: c.parsed.dependencies,
        }));

      if (claudeMdConfigs.length > 0) {
        const mergedClaudeMd = this.configMerger.merge(claudeMdConfigs);
        // Write directly to resolvedOutputDir without additional path validation since resolvedOutputDir is already validated
        const claudeMdPath = path.join(resolvedOutputDir, 'CLAUDE.md');
        await fs.writeFile(claudeMdPath, mergedClaudeMd);
      }
      if (spinner) spinner.succeed(steps[currentStep]);

      // Merge and write agents to .claude/agents/
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const agentGroups = parsedConfigs.map(c => c.parsed.agents);
      const mergedAgents = this.componentMerger.mergeAgents(agentGroups);

      for (const agent of mergedAgents) {
        // Validate and sanitize agent data
        const validatedAgent = InputValidator.validateAgent(agent);
        const agentName = typeof validatedAgent.name === 'string' ? validatedAgent.name : 'unknown';
        const filename = `${PathValidator.validateFilename(agentName.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}.md`;
        const content = this.componentMerger.generateAgentFile(validatedAgent);
        // Write directly to agentsDir (already created above)
        const agentPath = path.join(agentsDir, filename);
        await fs.writeFile(agentPath, content);
      }
      if (spinner) spinner.text = `${steps[currentStep]} (${mergedAgents.length} agents)`;
      if (spinner) spinner.succeed();

      // Merge and write commands to .claude/commands/
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const commandGroups = parsedConfigs.map(c => c.parsed.commands);
      const mergedCommands = this.componentMerger.mergeCommands(commandGroups);

      for (const command of mergedCommands) {
        // Validate and sanitize command data
        const validatedCommand = InputValidator.validateCommand(command);
        const commandName =
          typeof validatedCommand.name === 'string' ? validatedCommand.name : 'unknown';
        const filename = `${PathValidator.validateFilename(commandName.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}.md`;
        const content = this.componentMerger.generateCommandFile(validatedCommand);
        // Write directly to commandsDir (already created above)
        const commandPath = path.join(commandsDir, filename);
        await fs.writeFile(commandPath, content);
      }
      if (spinner) spinner.text = `${steps[currentStep]} (${mergedCommands.length} commands)`;
      if (spinner) spinner.succeed();

      // Merge and write hooks to .claude/hooks/
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const hookGroups = parsedConfigs.map(c => c.parsed.hooks);
      const mergedHooks = this.componentMerger.mergeHooks(hookGroups);

      // Process hooks (directory already created above)
      let writtenHooksCount = 0;
      for (const hook of mergedHooks) {
        // Skip hooks.json as it's a special configuration file that shouldn't be copied
        if (hook.name === 'hooks.json') {
          continue;
        }
        
        // Validate and sanitize hook data
        const validatedHook = InputValidator.validateHook(hook);
        const hookName =
          typeof validatedHook.name === 'string' ? validatedHook.name : 'unknown-hook';
        const hookContent = typeof validatedHook.content === 'string' ? validatedHook.content : '';
        // Write directly to hooksDir
        const hookPath = path.join(hooksDir, hookName);
        await fs.writeFile(hookPath, hookContent);
        writtenHooksCount++;
      }
      if (spinner) spinner.text = `${steps[currentStep]} (${writtenHooksCount} hooks)`;
      if (spinner) spinner.succeed();

      // Merge and write settings.json to .claude/
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const settingsArray = parsedConfigs.map(c => c.parsed.settings);
      const mergedSettings = this.componentMerger.mergeSettings(settingsArray);

      // Do NOT add _metadata to settings - it's not allowed in Claude Code settings.json schema
      // The _metadata was for internal tracking but should not be in the final output

      // Debug: log merged settings before validation
      if (process.env.DEBUG) {
        console.log('Merged settings before validation:', JSON.stringify(mergedSettings, null, 2));
      }

      // Validate the merged settings
      const validatedSettings = InputValidator.validateSettings(mergedSettings);

      // Debug: log validated settings
      if (process.env.DEBUG) {
        console.log('Validated settings:', JSON.stringify(validatedSettings, null, 2));
      }

      // Write settings.json directly to the already-created .claude directory
      const settingsPath = path.join(claudeDir, 'settings.json');
      await fs.writeFile(settingsPath, JSON.stringify(validatedSettings, null, 2));
      if (spinner) spinner.succeed(steps[currentStep]);

      // Skip README and package.json generation - these conflict with existing project files

      // Validate the generated structure
      currentStep++;
      if (spinner) spinner.start(steps[currentStep]);
      const validation = await this.validateGeneratedStructure(resolvedOutputDir);
      if (!validation.valid) {
        if (spinner) spinner.warn(`${steps[currentStep]} - ${validation.errors.length} warnings`);
        validation.errors.forEach(error => console.warn(chalk.yellow(`   - ${error}`)));
      } else {
        if (spinner) spinner.succeed(steps[currentStep]);
      }
    } catch (error) {
      if (spinner) spinner.fail(`Failed at: ${steps[currentStep]}`);
      throw error;
    }
  }

  async validateGeneratedStructure(
    outputDir: string
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Check required files at root
    const requiredRootFiles = ['CLAUDE.md'];
    for (const file of requiredRootFiles) {
      const filePath = path.join(outputDir, file);
      try {
        await fs.access(filePath);
      } catch {
        errors.push(`Missing required file: ${file}`);
      }
    }

    // Check .claude directory structure
    const claudeDir = path.join(outputDir, '.claude');
    try {
      await fs.access(claudeDir);
    } catch {
      errors.push('Missing .claude directory');
      return { valid: false, errors };
    }

    // Check required subdirectories
    const requiredDirs = ['agents', 'commands', 'hooks'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(claudeDir, dir);
      try {
        await fs.access(dirPath);
      } catch {
        errors.push(`Missing .claude/${dir} directory`);
      }
    }

    // Check settings.json
    const settingsPath = path.join(claudeDir, 'settings.json');
    try {
      await fs.access(settingsPath);
      const settingsContent = await fs.readFile(settingsPath, 'utf-8');
      const _settings = JSON.parse(settingsContent);
      // Don't check for _metadata as it's not part of the Claude Code settings.json schema
      // Just verify the JSON is valid
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as NodeJS.ErrnoException).code === 'ENOENT'
      ) {
        errors.push('Missing .claude/settings.json');
      } else {
        errors.push('Invalid settings.json format');
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
