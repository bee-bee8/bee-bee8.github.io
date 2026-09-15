# Interactive Learning Tools

Interactive maths, science and AI learning activities built by **Yung Fu Chuen**.
This portfolio edition offers public access without an account.

## Deploy to GitHub Pages

1. Create a GitHub repository for this portfolio.
2. Push the **contents of this directory** to its `main` branch. `index.html`
   and `.github/workflows/deploy-pages.yml` must be at the repository root,
   rather than inside another `portfolio` folder. Include the `.github` folder.
3. In the GitHub repository, open **Settings → Pages → Build and deployment**
   and select **GitHub Actions** as the source.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** if the
   initial push ran before Pages was enabled. Later pushes to `main` deploy
   automatically.
5. When the deployment succeeds, open the URL shown by the deployment job or
   Settings → Pages. For a project repository it is normally
   `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

The workflow refreshes the bundled catalog and publishes only the site files.
There is no server backend or authentication service to configure. Asset paths
and tool navigation support both repository subpaths and root domains.

The earlier error from double-clicking a local file does not apply to GitHub
Pages: Pages serves the catalog and activities over HTTPS.

Workflow reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Run locally

From this directory:

```sh
python -m http.server 8000
```

Open http://localhost:8000/ in a browser. This is the recommended way to run all
activities, including games that load JavaScript modules or data files.

You can also double-click `index.html` to browse the catalog. In that mode the
homepage uses a bundled catalog because browsers block local CSV requests.
Some individual activities still require the HTTP server described above.

After changing `tools-manifest.csv`, refresh the bundled catalog with:

```sh
python scripts/update-tool-catalog.py
```

Hosted and local HTTP versions continue to load the CSV directly.

## Project structure

- `index.html`: searchable activity catalog and portfolio introduction.
- `tools-manifest.csv`: the 17 activities and available language variants.
- `Tools/`, `Games/`, `STEM_tools/`, `AI_tools/`: interactive activities.
- `assets/`: shared navigation and fullscreen controls.

The existing activity implementations and language availability are retained.
Some activities load third-party libraries from CDNs and require internet access.

## Separate portfolio edition

This directory is a standalone Git repository copied from the company edition.
It excludes the company login portal and promotional landing page. Its navigation
and assets resolve within the portfolio, including when hosted in a subdirectory.

The GitHub Pages workflow is configured locally. A remote repository has not
been connected and the website has not been published from this workspace.
The sibling `github_upload_tools` directory remains the company edition.

## Implementation scope

The portfolio includes public access, personal attribution, portable navigation,
a catalog that can also be opened directly as a file, and a GitHub Pages workflow.
Full device acceptance testing and verification of the live GitHub Pages URL
remain to be completed after publication.
