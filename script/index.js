const taigi = { id: 'tws', name: 'Tâi-gí' };

//please note, this system not support multiple entry
let additionalWord = [
	['banbana', 'bān-bān-á'],
	[ 'taigi', 'Tâi-gí' ],
	[ 'taioan', 'Tâi-oân' ],
	[ 'pehoeji', 'Pe̍h-ōe-jī' ],
	[ 'goa', 'góa' ],
	[ 'goabin', 'gōa-bīn' ],
	[ 'goakhau', 'gōa-kháu'],
	[ 'choekin', 'chòe-kīn' ],
	[ 'mihkiann', 'mi̍h-kiāⁿ' ],
	[ 'bikok', 'Bí-kok' ],
	[ 'bohoattoo', 'bô-hoat-tō͘'  ],
	[ 'thinnoooo', 'thiⁿ-o͘-o͘' ]
];
$.ime.twsInjector(taigi, { id: 'tws-LATN', name: 'Tâi-gí lô-má-jī', source: 'tws-latin.js', wordTable: additionalWord });
$.ime.preferences.setLanguage('tws');

var stateKey = '';

function onStateChanged() {
	let newStateKey = '';
	if(null == history.state) {
		newStateKey = '';
	}
	else {
		newStateKey = history.state.key;
	}
	
	if(stateKey == newStateKey) {
		return;
	}
	
	//console.log('tws input method reload');
	
	var imeDom = $( 'input, textarea, [contenteditable]' );
	imeDom.ime({ languages: ['tws'], imePath: browser.runtime.getURL('rules') + '/' });
}

$(document).ready(onStateChanged);
$(window).bind('popstate', onStateChanged);

