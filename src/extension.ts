import * as vscode from 'vscode';

interface CharMap {
	[key: string]: string;
}

/**
 * A helper function to wrap `String.prototype.replace()`.
 * @param text Text to be replaced.
 * @param regex Pattern to search for.
 * @param offset How far single character shifts in Unicode codepoints.
 */
const substitueAll = (text: string, regex: RegExp, offset: number): string => text.replace(regex, (s) => String.fromCharCode(s.charCodeAt(0) + offset));

/** Translates alphabetic, numeric and symbolic characters into full width ones under the command "Alpha Num Symbol 半角→全角 英 数 記号" */
export const hanzenAlphaNumSymbol = (text: string): string => {
	const config = vscode.workspace.getConfiguration("zenkakuHankaku.companionCharacterTo");
	const cBackslash = config.get("backslash") as unknown as string;
	const cHyphen = config.get("hyphen") as unknown as string;
	const cTilde = config.get("tilde") as unknown as string;
	const cPeriod = config.get("period") as unknown as string;
	const cComma = config.get("comma") as unknown as string;
	return text.replace(/[a-z0-9 !-~]/gi, (s: string): string => {
		switch (s) {
			case " ":
				return "　";
			case "\\":
				return cBackslash;
			case "-":
				return cHyphen;
			case "~":
				return cTilde;
			case ".":
				return cPeriod;
			case ",":
				return cComma;
			default:
				return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
		}
	});
};

/** Translates alphanumeric characters into full width ones under the command "Alpha Num 半角→全角 英 数" */
export const hanzenAlphaNum = (text: string): string => substitueAll(text, /[a-z0-9]/gi, 0xfee0);

/** Translates alphabetic characters into full width ones under the command "Alphabet 半角→全角 英字" */
export const hanzenAlphabet = (text: string): string => substitueAll(text, /[a-z]/gi, 0xFEE0);

/** Translates numeric characters into full width ones under the command "Number 半角→全角 数字" */
export const hanzenNumber = (text: string): string => substitueAll(text, /[0-9]/g, 0xFEE0);

/** Translates symbolic characters into full width ones under the command "Symbol 半角→全角 記号" */
export const hanzenSymbol = (text: string): string => {
	const config = vscode.workspace.getConfiguration("zenkakuHankaku.companionCharacterTo");
	const cBackslash = config.get("backslash") as unknown as string;
	const cHyphen = config.get("hyphen") as unknown as string;
	const cTilde = config.get("tilde") as unknown as string;
	const cPeriod = config.get("dot") as unknown as string;
	const cComma = config.get("comma") as unknown as string;
	return text.replace(/[ !-~]/gi, (s: string): string => {
		switch (s) {
			case " ":
				return "　";
			case "\\":
				return cBackslash;
			case "-":
				return cHyphen;
			case "~":
				return cTilde;
			case ".":
				return cPeriod;
			case ",":
				return cComma;
			default:
				return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
		}
	});
};

/** Translates alphabetic, numeric and symbolic characters into half width ones under the command "Alpha Num Symbol 全角→半角 英 数 記号" */
export const zenhanAlphaNumSymbol = (text: string): string => substitueAll(text, /[ａ-ｚ０-９！-～]/gi, -0xfee0).replace(/　/g, " ").replace(/[～〜]/g, "~").replace(/[—―–]/g, "-");

/** Translates alphanumeric characters into half width ones under the command "Alpha Num 全角→半角 英 数" */
export const zenhanAlphaNum = (text: string): string => substitueAll(text, /[ａ-ｚ０-９]/gi, -0xFEE0);

/** Translates alphabetic characters into half width ones under the command "Alphabet 全角→半角 英字" */
export const zenhanAlphabet = (text: string): string => substitueAll(text, /[ａ-ｚ]/gi, -0xFEE0);

/** Translates numeric characters into half width ones under the command "Number 全角→半角 数字" */
export const zenhanNumber = (text: string): string => substitueAll(text, /[０-９]/g, -0xFEE0);

/** Translates symbolic characters into half width ones under the command "Symbol 全角→半角 記号" */
export const zenhanSymbol = (text: string): string => substitueAll(text, /[！-～]/g, -0xfee0).replace(/　/g, " ").replace(/[～〜]/g, "~").replace(/[—―–]/g, "-");

/** Translates Hiragana characters into Katakana characters under the command "Hira to Kata ひらがな→カタカナ" */
export const HiraganaKatakana = (text: string): string => substitueAll(text, /[ぁ-ゖ]/g, 0x60);

/** Translates Katakana characters into Hiragana characters under the command "Kata to Hira カタカナ→ひらがな" */
export const KatakanaHiragana = (text: string): string => substitueAll(text, /[ァ-ヶ]/g, -0x60);

/** Translates half width Katakana characters into full width ones under the command "Katakana 半角カナ→全角カナ" */
export const hanzenKatakana = (text: string): string => {
	const kanaMapHanZen: CharMap = {
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
	};
	const kanaMapHanZenSymbols: CharMap = {
		"｡": "。", "､": "、", "ｰ": "ー", "｢": "「", "｣": "」", "･": "・"
	};
	const isTranslationAllowed = vscode.workspace.getConfiguration("zenkakuHankaku.translateKatakana").get("intoFullWidthIncludesSymbols") as unknown as boolean;
	const kanaMap: CharMap = isTranslationAllowed ? Object.assign(kanaMapHanZen, kanaMapHanZenSymbols) : kanaMapHanZen;
	return text.replace(new RegExp(`(${Object.keys(kanaMap).join('|')})`, 'g'), (match) => kanaMap[match]);
};

/** Translates full width Katakana characters into half width ones under the command "Katakana 全角カナ→半角カナ" */
export const zenhanKatakana = (text: string): string => {
	const kanaMapZenHan: CharMap = {
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
	};
	const kanaMapZenHanSymbols: CharMap = {
		"。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
	};
	const isTranslationAllowed = vscode.workspace.getConfiguration("zenkakuHankaku.translateKatakana").get("intoHalfWidthIncludesSymbols") as unknown as boolean;
	const kanaMap: CharMap = isTranslationAllowed ? Object.assign(kanaMapZenHan, kanaMapZenHanSymbols) : kanaMapZenHan;
	return text.replace(new RegExp(`(${Object.keys(kanaMap).join('|')})`, 'g'), (match) => kanaMap[match]);
};

/**
 * main function
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
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

	const register = vscode.commands.registerTextEditorCommand;
	const disposables = [
		register("zenkaku-hankaku.hanzenAlphaNumSymbol", handler(hanzenAlphaNumSymbol)),
		register("zenkaku-hankaku.hanzenAlphaNum", handler(hanzenAlphaNum)),
		register("zenkaku-hankaku.hanzenAlphabet", handler(hanzenAlphabet)),
		register("zenkaku-hankaku.hanzenNumber", handler(hanzenNumber)),
		register("zenkaku-hankaku.hanzenSymbol", handler(hanzenSymbol)),
		register("zenkaku-hankaku.zenhanAlphaNumSymbol", handler(zenhanAlphaNumSymbol)),
		register("zenkaku-hankaku.zenhanAlphaNum", handler(zenhanAlphaNum)),
		register("zenkaku-hankaku.zenhanAlphabet", handler(zenhanAlphabet)),
		register("zenkaku-hankaku.zenhanNumber", handler(zenhanNumber)),
		register("zenkaku-hankaku.zenhanSymbol", handler(zenhanSymbol)),
		register("zenkaku-hankaku.zenhanKatakana", handler(zenhanKatakana)),
		register("zenkaku-hankaku.hanzenKatakana", handler(hanzenKatakana)),
		register("zenkaku-hankaku.HiraganaKatakana", handler(HiraganaKatakana)),
		register("zenkaku-hankaku.KatakanaHiragana", handler(KatakanaHiragana))
	] as const;
	disposables.forEach( (d) => context.subscriptions.push(d) );
}
