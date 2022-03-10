# Web-Screenshot-Action 📷
--------------------------

GitHub Action to take a screenshot of a website.

![Example-Screenshot](./screenshot.png)

## Usage

```yaml
- name: Take Screenshot
  uses: Shresht7/web-screenshot-action@main
  with:
    url: https://github.com/Shresht7/web-screenshot-action
```

### Inputs

| Input                   | Type                           | Description                                                                                              |
| ----------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `url`                   | `string`                       | URL to take the screenshot of. (**required**)                                                            |
| `path`                  | `string`                       | Screenshot filepath. (_default_: `screenshot.png`)                                                       |
| `width`                 | `number`                       | Viewport width. (_default_: `1920`)                                                                      |
| `height`                | `number`                       | Viewport height. (_default_: `1080`)                                                                     |
| `captureFullPage`       | `boolean`                      | Should take screenshot of the entire page. (_default_: `false`)                                          |
| `captureBeyondViewport` | `boolean`                      | Should take screenshot beyond the viewport. (_default_: `false`)                                         |
| `omitBackground`        | `boolean`                      | Should omit the background to take transparent screenshots. (_default_: `false`)                         |
| `encoding`              | `base64 | binary | undefined ` | Output encoding. (_default_: `undefined`)                                                                |
| `shouldCreateArtifacts` | `boolean`                      | Should generate screenshot artifacts. (_default_: `false`)                                               |
| `delay`                 | `number`                       | Should wait x milliseconds before taking screenshot (_default_: `1000`)                                  |
| `darkMode`              | `boolean`                      | Should enable dark mode by setting `prefers-color-scheme: dark` media feature [boolean] (default: false) |

### Outputs

if `shouldCreateArtifacts` is set to `true`, an [artifact](https://help.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts) will be created with the screenshot.

## Workflow Setup

Intended to be used as a sub-task in some other workflow, this action's only job is to generate the screenshots. What you do with them is up to you.

### Example

The [screenshot](#-web-screenshot-action) in this README is auto-generated using this action!

[`.github/workflows/screenshot.yml`](./.github/workflows/screenshot.yml):

```yaml
# ============================
#         SCREENSHOT
# ----------------------------
# Take screenshot of a website
# ============================

name: Screenshot

# Activation Events
# =================

on:
  workflow_dispatch:  # When a workflow event is dispatched manually

# Jobs
# ====

jobs:
  Screenshot:
    runs-on: ubuntu-latest
    
    name: Screenshot
    steps:
    
      # Actions/Checkout ✅
      # ===================

      # Required for GITHUB_WORKSPACE
      - name: Checkout
        uses: actions/checkout@v3

      # Take Screenshot 📷
      # ==================

      - name: Screenshot
        uses: Shresht7/web-screenshot-action@main
        id: Screenshot
        with:
          url: https://www.github.com/Shresht7/web-screenshot-action

      # Push to Main 🌐
      # ===============

      - name: Commit
        run: |
          git config --global user.name github-actions
          git config --global user.email github-actions@github.com
          git add .
          git commit -m 'Update screenshot 📷'
          git push
```