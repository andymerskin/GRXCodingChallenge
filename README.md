# Exercise: Build an Explorer

This exercise is to build a folder and file explorer (or a tree control). You must use ReactJS for this project. We recommend using https://github.com/facebookincubator/create-react-app to bootstrap your project, but you can set it up however you'd like.

Please do not use an off-the-shelf tree control packages or any CSS frameworks (like Bootstrap or Foundation) since that would
defeat the purpose of this project!

## Requirements

### Application

- Use create-react-app to create a react app that renders the interactive file explorer shown in `mockup.png`
- Use the data from `data.json` to render the actual folders & files. You can make the data in `data.json` a global variable so that you don't need to load it with AJAX.
- We will run your code by opening your project, running `npm install` and `npm start`, and viewing the result at localhost:3000

#### Appearance

- What you build should look like a modal but doesn't need to function like one. (i.e. opening/closing and dragging it around are not necessary)
- Visually has appearance similar to that of `mockup.png` (private folders should have the red icon appearance)

### Minimum Features

- Folders should be able to expand or collapse by clicking on the expand/collapse icon.
- Folders and files should have a hover appearance (such as highlighting the row blue).

### Advanced Features (Do Not Code These!)

Below are advanced features. Please do not implement these, but **architect your minimum features with the advanced features in mind**. In later interviews,
you may be asked exactly how you would implement these into your app.

- Add a button "Export". This should export the exact state & configuration of your app - the folders & files structure,
  which ones are expanded/collapsed, which one is selected. You should decide what you want the exported configuration file to hold.
- Add a button "Import". This should allow the user to import data that you exported from the above feature and
  re-render the explorer to the state specified in the imported file.
- Add a button "Add". This should allow the user to add a new file or folder to the location that is currently selected.
- Add the ability to move a file or folder by dragging it to another location.

## Evaluation Criteria

1. Minimum features completed
2. DRY, reusable, well-thought-out code that lays good infrastructure for implementing all of the Advanced Features
3. Simplicity of overall solution
4. Clean CSS rendering of `mockup.png` in latest Chrome
