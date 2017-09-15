"use strict";

const colors = require("colors/safe");
const child = require("child_process");
const program = require("commander");
const path = require("path");
const packageJson = require("package-json");
const fs = require("fs");
const Helper = require("../helper");
const Utils = require("./utils");

program
	.command("install <package>")
	.description("Install a package")
	.on("--help", Utils.extraHelp)
	.action(function(packageName) {
		if (!fs.existsSync(Helper.CONFIG_PATH)) {
			log.error(`${Helper.CONFIG_PATH} does not exist.`);
			return;
		}

		packageJson(packageName, {
			fullMetadata: true
		}).then((json) => {
			if (!("keywords" in json) || !json.keywords.includes("lounge")) {
				log.error(`${colors.red(packageName)} is not a package for The Lounge.`);

				process.exit(1);
			}

			if (!("lounge" in json)) {
				log.error(`${colors.red(packageName)} does not have The Lounge metadata.`);

				process.exit(1);
			}

			const npm = child.spawn(
				path.sep === "\\" ? "npm.cmd" : "npm",
				[
					"install",
					"--global",
					"--production",
					"--no-save",
					"--prefix",
					Helper.getPackagesPath(),
					packageName
				],
				{
					stdio: "inherit"
				}
			);

			npm.on("error", (e) => {
				log.error(`${e}`);
				process.exit(1);
			});

			npm.on("close", (code) => {
				if (code !== 0) {
					return;
				}

				log.info(`${colors.green(packageName)} has been successfully installed.`);
			});
		}).catch((e) => {
			log.error(`${e}`);
			process.exit(1);
		});
	});
