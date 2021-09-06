import {addDecorator, addParameters, configure, storiesOf} from '@storybook/html';

import '!style-loader!css-loader!sass-loader!./global-styles.scss';
import {withKnobs} from "@storybook/addon-knobs";
// import {addReadme} from "storybook-readme/html";

const stories = require.context('../src/components', true, /\.stories\.tsx?$/);
const readmes = require.context('../src/components', true, /\.md$/);

configure(function () {
	stories.keys().map(key => {
		stories(key).default(createStory(key));
	})
}, module);

function createStory(directory) {
	// Gets the name of the component directory from whoever is calling this function.
	const componentName = directory.split('/').slice(-2, -1).pop();
	const story = storiesOf(componentName, module).addDecorator(withKnobs);
	const readme = readmes.keys().find(k => new RegExp(`\.\/${componentName}\/.*\.md`).test(k));
	// TODO: fix documentation - use @storybook/addon-docs - storybook-readme becomes really slow with HMR for some reason
	/*if(readme) {
		story.addDecorator(addReadme)
			.addParameters({
				readme: {
					sidebar: readmes(readme).default,
				},
			})
	}*/

	return story;
}
