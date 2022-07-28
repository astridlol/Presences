// Presence is in this self-invoking function to avoid conflicts in names

(() => {
	const rpc = new Presence({
			clientId: "1001937158136934400",
		}),
		startTimestamp = Date.now();

	rpc.on("UpdateData", async () => {
		const path: string = document.location.pathname,
			presenceData: PresenceData = {
				largeImageKey: "icon-192",
				startTimestamp,
			};

		// Function to be used on i.upload.systems pages
		function getUploader() {
			const uploader = document.querySelector<HTMLInputElement>(
					".mt-4 > span:nth-child(1)"
				),
				unknown = "an unknown user";
			if (uploader) {
				if (uploader.textContent === "Anonymous User") return unknown;
				else return uploader.textContent;
			} else return unknown;
		}

		switch (path) {
			case "/home": {
				presenceData.details = "Viewing the home page";
				break;
			}

			// Domain pages

			case "/domains": {
				presenceData.details = "Viewing all domains";
				break;
			}

			case "/domains/donate": {
				presenceData.details = "Donating a domain";
				break;
			}

			case "/domains/manage": {
				presenceData.details = "Managing their domains";
				break;
			}

			case "/gallery": {
				presenceData.details = "Viewing their image gallery";
				break;
			}

			// User pages
			case "/user": {
				presenceData.details = "Viewing their profile";
				break;
			}

			// User settings pages
			case "/user/settings/profile": {
				presenceData.details = "Editing their profile";
				break;
			}

			case "/user/settings/security": {
				presenceData.details = "Editing their profile security";

				const input = document.querySelector<HTMLInputElement>(
					"div.mb-3:nth-child(1) > input:nth-child(2)"
				)?.value;
				if (input) presenceData.state = "Changing their password";

				break;
			}

			case "/user/settings/uploadpreferences?tab=basicSettings": {
				presenceData.details = "Viewing upload preferences";
				break;
			}

			case "/user/settings/uploadpreferences?tab=embedSettings": {
				presenceData.details = "Editing their Discord embed";
				break;
			}

			case "/user/settings/uploadpreferences?tab=domainSettings": {
				presenceData.details = "Changing their image links";
				break;
			}

			case "/user/settings/subscriptions": {
				presenceData.details = "Viewing their subscription settings";
				break;
			}

			case "/user/settings/mail": {
				presenceData.details = "Modifying their email settings";
				break;
			}

			case "/themes": {
				presenceData.details = "Viewing all themes";
				break;
			}

			case "/themes/add": {
				presenceData.details = "Adding a theme";
				break;
			}

			// Tools pages
			case "/tools": {
				presenceData.details = "Viewing all tools";
				break;
			}

			case "/tools/uploader": {
				presenceData.details = "Using the web uploader";
				break;
			}

			case "/tools/bulk": {
				presenceData.details = "Using the bulk uploader";
				break;
			}

			case "/tools/shorten": {
				presenceData.details = "Using the URL shortener";
				break;
			}

			case "/tools/pastes": {
				presenceData.details = "Viewing pastes";
				break;
			}

			case "/tools/pastes/new": {
				presenceData.details = "Creating a new paste";
				break;
			}

			// Information pages
			case "/notifications": {
				presenceData.details = "Viewing their notifications";
				break;
			}
			case "/subscriptions": {
				presenceData.details = "Checking out the subscriptions";
				break;
			}
			case "/changelogs": {
				presenceData.details = "Viewing the changelogs";
				break;
			}
			case "/terms": {
				presenceData.details = "Viewing the terms of service";
				break;
			}
			case "/rules": {
				presenceData.details = "Viewing the rules";
				break;
			}
			case "/privacy": {
				presenceData.details = "Viewing the privacy policy";
				break;
			}
			default: {
				if (document.URL.includes("i.upload.systems")) {
					presenceData.details = "Viewing an image";
					presenceData.state = `From ${getUploader()}`;
				} else presenceData.details = "On an unknown page";
			}
		}

		// Admin pages
		if (path.includes("/admin")) presenceData.details = "On an admin page";

		// General things
		if (document.querySelector<HTMLDivElement>(".NotificationBox_box__OkDXu"))
			presenceData.details = "Viewing their notifications";

		if (presenceData.details || presenceData.state)
			rpc.setActivity(presenceData);
		else rpc.setActivity();
	});
})();
