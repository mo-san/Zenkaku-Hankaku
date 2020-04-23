import * as assert from 'assert';
import * as vscode from 'vscode';
import {
	hanzenAlphaNumSymbol, hanzenAlphaNum, hanzenAlphabet, hanzenNumber, hanzenSymbol, hanzenKatakana,
	zenhanAlphaNumSymbol, zenhanAlphaNum, zenhanAlphabet, zenhanNumber, zenhanSymbol, zenhanKatakana,
	HiraganaKatakana, KatakanaHiragana
} from "../../extension";

suite('Extension Test Suite', () => {
	const halfAlpha = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
	const fullAlpha = `ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ`;
	const halfNumber = `0123456789`;
	const fullNumber = `０１２３４５６７８９`;
	const halfChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~ `;
	const fullChars = `！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～　`;
	const halfKata = `｡｢｣､･ｧｱｨｲｩｳｪｴｫｵｶｶﾞｷｷﾞｸｸﾞｹｹﾞｺｺﾞｻｻﾞｼｼﾞｽｽﾞｾｾﾞｿｿﾞﾀﾀﾞﾁﾁﾞｯﾂﾂﾞﾃﾃﾞﾄﾄﾞﾅﾆﾇﾈﾉﾊﾊﾞﾊﾟﾋﾋﾞﾋﾟﾌﾌﾞﾌﾟﾍﾍﾞﾍﾟﾎﾎﾞﾎﾟﾏﾐﾑﾒﾓｬﾔｭﾕｮﾖﾗﾘﾙﾚﾛヮﾜヰヱｦﾝｳﾞ`;
	const fullKata = `。「」、・ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴ`;
	const fullHira = `。「」、・ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔ`;
	suite("han → zen", () => {
		test("Alphabet, Number, Symbol", () => assert.equal(hanzenAlphaNumSymbol(`${halfAlpha}${halfNumber}${halfChars}`), `${fullAlpha}${fullNumber}${fullChars}`));
		test("Alphabet, Number", () => assert.equal(hanzenAlphaNum(`${halfAlpha}${halfNumber}`), `${fullAlpha}${fullNumber}`));
		test("Alphabet", () => assert.equal(hanzenAlphabet(`${halfAlpha}`), `${fullAlpha}`));
		test("Number", () => assert.equal(hanzenNumber(`${halfNumber}`), `${fullNumber}`));
		test("Symbol", () => assert.equal(hanzenSymbol(`${halfChars}`), `${fullChars}`));
		test("Katakana", () => assert.equal(hanzenKatakana(`${halfKata}`), `${fullKata}`));
	});
	suite("zen → han", () => {
		test("Alphabet, Number, Symbol", () => assert.equal(zenhanAlphaNumSymbol(`${fullAlpha}${fullNumber}${fullChars}`), `${halfAlpha}${halfNumber}${halfChars}`));
		test("Alphabet, Number", () => assert.equal(zenhanAlphaNum(`${fullAlpha}${fullNumber}`), `${halfAlpha}${halfNumber}`));
		test("Alphabet", () => assert.equal(zenhanAlphabet(`${fullAlpha}`), `${halfAlpha}`));
		test("Number", () => assert.equal(zenhanNumber(`${fullNumber}`), `${halfNumber}`));
		test("Symbol", () => assert.equal(zenhanSymbol(`${fullChars}`), `${halfChars}`));
		test("Katakana", () => assert.equal(zenhanKatakana(`${fullKata}`), `${halfKata}`));
	});
	suite("hiragana and katakana", () => {
		test("hira → kata", () => assert.equal(HiraganaKatakana(`${fullHira}`), `${fullKata}`));
		test("kata → hira", () => assert.equal(KatakanaHiragana(`${fullKata}`), `${fullHira}`));
	});
});
