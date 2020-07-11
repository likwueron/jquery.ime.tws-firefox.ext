( function ( $ ) {
	'use strict';
	const id = 'tws-LATN';
	const config = $.ime.sources[id];
	
	const toneTable = { 
		//from 0-9
		//tone 8 wont change here due to it used an independent rule
		'a': [ 'a', 'a', 'á','à','a','â','ǎ','ā','a','ă' ],
		'e': [ 'e', 'e', 'é','è','e','ê','ě','ē','e','ĕ' ],
		'i': [ 'i', 'i', 'í','ì','i','î','ǐ','ī','i','ĭ' ],
		'o': [ 'o', 'o', 'ó','ò','o','ô','ǒ','ō','o','ŏ' ],
		'u': [ 'u', 'u', 'ú','ù','u','û','ǔ','ū','u','ŭ' ],
		//'A': [ 'A', 'A', 'Á','À','A','Â','Ǎ','Ā','A', '' ],
		//'E': [ 'E', 'E', 'É','È','E','Ê','Ě','Ē','E','' ],
		//'I': [ 'I', 'I', 'í','ì','i','î','ǐ','ī','i','ĭ' ],
		//'O': [ 'O', 'O', 'ó','ò','o','ô','ǒ','ō','o','ŏ' ],
		//'U': [ 'U', 'U', 'ú','ù','u','û','ǔ','ū','u','ŭ' ],
	};
	//where to place tone sign
	const toneSignPositionTable = {
        'io': 1,
        'ai': 0,
        'ia': 1,
        'oe': 1,
        'iau': 1
	}
	
	var taigi = {
		id: id,
		name: 'Tâi-gí',
		description: 'Taiwanese latin character input method',
		date: '2020-07-01',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'taigiwiki.org community',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: Math.max(config.maxWordLength || 0, 9) + 1,
		//every time you input new char, jquery.ime will search pattern once
		//ie: gua -> goa (apply a basic KIP-LMJ to POJ conversion); goa2 -> góa (apply tone rule)
		//all patterns are case sensitive
		patterns: [
			//fast look-up
			// aeiouo͘
			// mgnⁿ
			// htpk
		
			//KIP-LMJ to POJ only
			[ 'u([ae])', 'o$1' ],
			//[ 'ts([aeiouo͘])', 'ch$1' ],
			//[ 'tsh([aeiouo͘])', 'chh$1' ],
			[ 'i([k]) ', 'e$1' ],
			[ 'i([k])8', 'e̍$1' ],
			[ 'ing', 'eng' ],
			//POJ special characters convertion
			[ 'oo', 'o͘' ],
			[ 'ou', 'o͘' ],
			[ 'nn', 'ⁿ' ],
			//tone; siann-tiau
			[ '([aeiouo͘]{1,3})(ng|[mnⁿ])?([0-9])', ($all, $1, $2, $toneNumber) => {
				let toneVowelPos = toneSignPositionTable[$1];
                if(null == toneVowelPos)  {
                    toneVowelPos = 0;
                }
				let targetVowel = $1[toneVowelPos];
				
				let tail = undefined == $2 ? '' : $2;
				return $1.slice(0, toneVowelPos) + toneTable[targetVowel][$toneNumber] + $1.slice(toneVowelPos + 1) + tail;
			} ],
			[ 'm2', 'ḿ' ],
			[ 'ng2', 'ńg' ],
			[ 'm3', 'm̀' ],
			[ 'ng3', 'ǹg' ],
			[ 'm5', 'm̂' ],
			[ 'ng5', 'n̂g' ],
			[ 'm6', 'm̌' ],
			[ 'ng6', 'ňg' ],
			[ 'm7', 'm̄' ],
			[ 'ng7', 'n̄g' ],
			[ 'm9', 'm̆' ],
			[ 'ng9', 'n̆g' ],
			
			['([aeiouo͘])?([mgnⁿ]){0,3}([htpk])8', '$1$2̍$3'],
		]
	};
	
	var wordTable = config.wordTable || [];
	
	//append word to tail...
	//1. end with 'space' to avoid conflict
	//2. pay attention to nn => ⁿ due to that rule already be applied
	Array.prototype.push.apply(taigi.patterns, 
		wordTable.map(el => [ el[0].replace('nn', 'ⁿ').replace( new RegExp('o([ou])', 'gm'), 'o͘' ) + ' ', el[1] ]));

	$.ime.register( taigi );
}( jQuery ) );
