( function ( $ ) {
	'use strict';
	const injectname = 'twsInjector';
	if(undefined == $.ime[injectname]) {
		$.ime[injectname] = (languageConfig, imConfig) => {
			let imObj = {};
			imObj[imConfig.id] = imConfig;
			//replace old one
			$.extend($.ime.sources, imObj);
			//if lang already existed
			if(undefined != $.ime.languages[languageConfig.id]) {
				if(-1 == $.ime.languages[languageConfig.id].inputmethods.indexOf(imConfig.id)) {
					$.ime.languages[languageConfig.id].inputmethods.push(imConfig.id);
				}
			}
			else {
				let langObj = {};
				langObj[languageConfig.id] = { autonym: languageConfig.name, inputmethods: [imConfig.id] };
				$.extend($.ime.languages, langObj);
			}
		}
	}
}(jQuery));