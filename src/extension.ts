import * as vscode from 'vscode';

interface KanaMap {
	[key: string]: string;
}

/** Translates alphabetic, numeric and symbolic characters into full width ones under a command "半角→全角 英数記" */
export const hanzenAlphaNumSymbol = (text: string): string =>
	text.replace(/[a-z0-9 !-~]/gi, (s) => s === " " ? "　" : String.fromCharCode(s.charCodeAt(0) + 0xfee0));

/** Translates alphanumeric characters into full width ones under a command "半角→全角 英数" */
export const hanzenAlphaNum = (text: string): string =>
	text.replace(/[a-z0-9]/gi, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));

/** Translates alphabetic characters into full width ones under a command "半角→全角 英" */
export const hanzenAlphabet = (text: string): string =>
	text.replace(/[a-z]/gi, (s) => String.fromCharCode(s.charCodeAt(0) + 0xFEE0));

/** Translates numeric characters into full width ones under a command "半角→全角 数" */
export const hanzenNumber = (text: string): string =>
	text.replace(/[0-9]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xFEE0));

/** Translates symbolic characters into full width ones under a command "半角→全角 記" */
export const hanzenSymbol = (text: string): string =>
	text.replace(/[ !-~]/g, (s) => s === " " ? "　" : String.fromCharCode(s.charCodeAt(0) + 0xfee0));

/** Translates alphabetic, numeric and symbolic characters into half width ones under a command "全角→半角 英数記" */
export const zenhanAlphaNumSymbol = (text: string): string =>
	text.replace(/[ａ-ｚ０-９　！-～]/gi, (s) => s === "　" ? " " : String.fromCharCode(s.charCodeAt(0) - 0xfee0));

/** Translates alphanumeric characters into half width ones under a command "全角→半角 英数" */
export const zenhanAlphaNum = (text: string): string =>
	text.replace(/[ａ-ｚ０-９]/gi, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));

/** Translates alphabetic characters into half width ones under a command "全角→半角 英" */
export const zenhanAlphabet = (text: string): string =>
	text.replace(/[ａ-ｚ]/gi, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));

/** Translates numeric characters into half width ones under a command "全角→半角 数" */
export const zenhanNumber = (text: string): string =>
	text.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));

/** Translates symbolic characters into half width ones under a command "全角→半角 記" */
export const zenhanSymbol = (text: string): string =>
	text.replace(/[　！-～]/g, (s) => s === "　" ? " " : String.fromCharCode(s.charCodeAt(0) - 0xFEE0));

/** Translates Hiragana characters into Katakana characters under a command "ひらがな→カタカナ" */
export const HiraganaKatakana = (text: string): string =>
	text.replace(/[ぁ-ゖ]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60));

/** Translates Katakana characters into Hiragana characters under a command "カタカナ→ひらがな" */
export const KatakanaHiragana = (text: string): string =>
	text.replace(/[ァ-ヶ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0x60));

/** Translates half width Katakana characters into full width ones under a command "半角カナ→全角カナ" */
export const hanzenKatakana = (text: string): string => {
	const kanaMap: KanaMap = {
		"ｶﾞ": "ガ", "ｷﾞ": "ギ", "ｸﾞ": "グ", "ｹﾞ": "ゲ", "ｺﾞ": "ゴ",
		"ｻﾞ": "ザ", "ｼﾞ": "ジ", "ｽﾞ": "ズ", "ｾﾞ": "ゼ", "ｿﾞ": "ゾ",
		"ﾀﾞ": "ダ", "ﾁﾞ": "ヂ", "ﾂﾞ": "ヅ", "ﾃﾞ": "デ", "ﾄﾞ": "ド",
		"ﾊﾞ": "バ", "ﾋﾞ": "ビ", "ﾌﾞ": "ブ", "ﾍﾞ": "ベ", "ﾎﾞ": "ボ",
		"ﾊﾟ": "パ", "ﾋﾟ": "ピ", "ﾌﾟ": "プ", "ﾍﾟ": "ペ", "ﾎﾟ": "ポ",
		"ｳﾞ": "ヴ", "ﾜﾞ": "ヷ", "ｦﾞ": "ヺ",
		"ｱ": "ア", "ｲ": "イ", "ｳ": "ウ", "ｴ": "エ", "ｵ": "オ",
		"ｶ": "カ", "ｷ": "キ", "ｸ": "ク", "ｹ": "ケ", "ｺ": "コ",
		"ｻ": "サ", "ｼ": "シ", "ｽ": "ス", "ｾ": "セ", "ｿ": "ソ",
		"ﾀ": "タ", "ﾁ": "チ", "ﾂ": "ツ", "ﾃ": "テ", "ﾄ": "ト",
		"ﾅ": "ナ", "ﾆ": "ニ", "ﾇ": "ヌ", "ﾈ": "ネ", "ﾉ": "ノ",
		"ﾊ": "ハ", "ﾋ": "ヒ", "ﾌ": "フ", "ﾍ": "ヘ", "ﾎ": "ホ",
		"ﾏ": "マ", "ﾐ": "ミ", "ﾑ": "ム", "ﾒ": "メ", "ﾓ": "モ",
		"ﾔ": "ヤ", "ﾕ": "ユ", "ﾖ": "ヨ",
		"ﾗ": "ラ", "ﾘ": "リ", "ﾙ": "ル", "ﾚ": "レ", "ﾛ": "ロ",
		"ﾜ": "ワ", "ｦ": "ヲ", "ﾝ": "ン",
		"ｧ": "ァ", "ｨ": "ィ", "ｩ": "ゥ", "ｪ": "ェ", "ｫ": "ォ",
		"ｯ": "ッ", "ｬ": "ャ", "ｭ": "ュ", "ｮ": "ョ",
		"｡": "。", "､": "、", "ｰ": "ー", "｢": "「", "｣": "」", "･": "・",
	};
	return text.replace(new RegExp(`(${Object.keys(kanaMap).join('|')})`, 'g'), (match) => kanaMap[match]);
};

/** Translates full width Katakana characters into half width ones under a command "全角カナ→半角カナ" */
export const zenhanKatakana = (text: string): string => {
	const kanaMap: KanaMap = {
		"ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
		"ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
		"ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
		"バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
		"パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
		"ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
		"ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
		"カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
		"サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
		"タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
		"ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
		"ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
		"マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
		"ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
		"ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
		"ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
		"ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
		"ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
		"。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･",
	};
	return text.replace(new RegExp(`(${Object.keys(kanaMap).join('|')})`, 'g'), (match) => kanaMap[match]);
};

export function activate(_: vscode.ExtensionContext) {
	function handler(callback: (text: string) => string): (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => void {
		return (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void => {
			const document = textEditor.document;
			if (textEditor.selections[0].isEmpty) {
				const posFirst = document.lineAt(0).range.start;
				const posLast = document.lineAt(document.lineCount - 1).range.end;
				edit.replace(new vscode.Range(posFirst, posLast), callback(document.getText()));
			}
			else {
				const _getTextInSelection = (selection: vscode.Selection): string => document.getText(new vscode.Range(selection.start, selection.end));
				textEditor.selections.map((selection: vscode.Selection) => edit.replace(selection, callback(_getTextInSelection(selection))));
			}
		};
	}

	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenAlphaNumSymbol", handler(hanzenAlphaNumSymbol));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenAlphaNum", handler(hanzenAlphaNum));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenAlphabet", handler(hanzenAlphabet));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenNumber", handler(hanzenNumber));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenSymbol", handler(hanzenSymbol));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanAlphaNumSymbol", handler(zenhanAlphaNumSymbol));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanAlphaNum", handler(zenhanAlphaNum));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanAlphabet", handler(zenhanAlphabet));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanNumber", handler(zenhanNumber));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanSymbol", handler(zenhanSymbol));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.zenhanKatakana", handler(zenhanKatakana));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.hanzenKatakana", handler(hanzenKatakana));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.HiraganaKatakana", handler(HiraganaKatakana));
	vscode.commands.registerTextEditorCommand("zenkaku-hankaku.KatakanaHiragana", handler(KatakanaHiragana));
}
