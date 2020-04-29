# Zenkaku-Hankaku

This extension is intended to replace (or substitute) some Japanese characters to another corresponding ones.
Japanese writing system has Japanese-specific ascii characters called "full-width characters". In this context, usual ascii chars are called "half-width characters". This extension switches them.
Addtionally, other alphabet systems in Japanese, such as "hiragana (ひらがな)" and "katakana (カタカナ)", are also targeted.

日本語の全角文字と半角文字を変換します。
半角カタカナと全角カタカナとの変換や、ひらがなとカタカナの変換にも対応しています。

## Installation

Visit and download from [VS Code Marketplace page](https://marketplace.visualstudio.com/items?itemName=masakit.zenkaku-hankaku), or search for `zenkaku-hankaku` from the command palatte (Ctrl+Alt+P) inside the Code app.

## Features

Choose a command from the command palette to execute.
When any words are selected (multiple selection also okay), those within the selected range(s) will be processed, otherwise whole text.

Command names depend on your VS Code's locale setting.

コマンドパレットからコマンドを選んでください。
文字列が選択(複数選択も可)されているとその範囲内が変換対象になり、何も選択されていない場合は全文が対象になります。

コマンド名はお使いの VS Code のロケール設定により変わります。

### Hankaku to Zenkaku (Half → Full)

| Command | Command Name:<br>En<br>Ja | Description | Example |
|---|---|---|---|
| `zenkaku-hankaku.hanzenAlphaNumSymbol` | `Alpha Num Symbol`<br>`英 数 記号` | translates alphabetic, numeric and symbolic characters into full width ones<br>半角のアルファベットと数字、記号を全角に置き換えます | `abc012 !#%` → `ａｂｃ０１２　！＃％` |
| `zenkaku-hankaku.hanzenAlphaNum` | `Alpha Num`<br>`英 数` | translates alphanumeric characters into full width ones<br>半角のアルファベットと数字を全角に置き換えます | `abc012 !#%` → `ａｂｃ０１２ !#%` |
| `zenkaku-hankaku.hanzenAlphabet` | `Alphabet`<br>`英字` | translates alphabetic characters into full width ones<br>半角のアルファベットを全角に置き換えます | `abc012 !#%` → `ａｂｃ012 !#%` |
| `zenkaku-hankaku.hanzenNumber` | `Number`<br>`数字` | translates numeric characters into full width ones<br>半角の数字を全角に置き換えます | `abc012 !#%` → `abc０１２ !#%` |
| `zenkaku-hankaku.hanzenSymbol` | `Symbol`<br>`記号` | translates symbolic characters into full width ones<br>半角の記号を全角に置き換えます | `abc012 !#%` → `abc012　！＃％` |
| `zenkaku-hankaku.hanzenKatakana` | `Katakana`<br>`半角カナ→全角カナ` | translates half width Katakana characters into full width ones<br>半角のカタカナを全角に置き換えます | `｢ｷｬﾘｰﾊﾟﾐｭﾊﾟﾐｭ｡｣` → `「キャリーパミュパミュ。」` |

### Zenkaku to Hankaku (Full → Half)
| Command | Command Name:<br>En<br>Ja | Description | Example |
|---|---|---|---|
| `zenkaku-hankaku.zenhanAlphaNumSymbol` | `Alpha Num Symbol`<br>`英 数 記号` | translates alphabetic, numeric and symbolic characters into half width ones<br>全角のアルファベットと数字、記号を半角に置き換えます | `ａｂｃ０１２　！＃％` → `abc012 !#%` |
| `zenkaku-hankaku.zenhanAlphaNum` | `Alpha Num`<br>`英 数` | translates alphanumeric characters into half width ones<br>全角のアルファベットと数字を半角に置き換えます | `ａｂｃ０１２　！＃％` → `abc012　！＃％` |
| `zenkaku-hankaku.zenhanAlphabet` | `Alphabet`<br>`英字` | translates alphabetic characters into half width ones<br>全角のアルファベットを半角に置き換えます | `ａｂｃ０１２　！＃％` → `abc０１２　！＃％` |
| `zenkaku-hankaku.zenhanNumber` | `Number`<br>`数字` | translates numeric characters into half width ones<br>全角の数字を半角に置き換えます | `ａｂｃ０１２　！＃％` → `ａｂｃ012　！＃％` |
| `zenkaku-hankaku.zenhanSymbol` | `Symbol`<br>`記号` | translates symbolic characters into half width ones<br>全角の記号を半角に置き換えます | `ａｂｃ０１２　！＃％` → `ａｂｃ０１２ !#%` |
| `zenkaku-hankaku.zenhanKatakana` | `Katakana`<br>`全角カナ→半角カナ` | translates half width Katakana characters into full width ones<br>全角のカタカナを半角に置き換えます | `「キャリーパミュパミュ。」` → `｢ｷｬﾘｰﾊﾟﾐｭﾊﾟﾐｭ｡｣` |

###  Hiragana to/from Katakana
| Command | Command Name:<br>En<br>Ja | Description | Example |
|---|---|---|---|
| `zenkaku-hankaku.HiraganaKatakana` | `Hiragana to Katakana`<br>`ひらがな→カタカナ` | translates Hiragana characters into Katakana ones<br>ひらがなをカタカナに置き換えます | `「きゃりーぱみゅぱみゅ。」` → `「キャリーパミュパミュ。」` |
| `zenkaku-hankaku.KatakanaHiragana` | `Katakana to Hiragana`<br>`カタカナ→ひらがな` | translates Katakana characters into Hiragana ones<br>カタカナをひらがなに置き換えます | `「キャリーパミュパミュ。」` → `「きゃりーぱみゅぱみゅ。」` |

## Settings

| locale: en | locale: ja |
|---|---|
| Include symbols (`。`, `、`, `ー`, `「`, `」`, `・`) when translating fullwidth katakana into halfwidth ones. | 全角カナ→半角カナへの変換に記号 (`。`, `、`, `ー`, `「`, `」`, `・`) を含める。 |
| Include symbols (`｡`, `､`, `ｰ`, `｢`, `｣`, `･`) when translating  halfwidth katakana into fullwidth ones. | 半角カナ→全角カナへの変換に記号 (`｡`, `､`, `ｰ`, `｢`, `｣`, `･`) を含める。 |
| The corresponding fullwidth character to halfwidth backslash (`\`)<ul><li>a backslash (`＼`)</li><li>a yen sign (`￥`)</li></ul>| 半角のバックスラッシュ (`\`) に対応する全角文字<ul><li>バックスラッシュ (`＼`)</li><li>円記号 (`￥`)</li></ul>|
| The corresponding fullwidth character to halfwidth hyphen (`-`)<ul><li>a dash (em Dash) / U+2014 (`—`)</li><li>a horizontal bar / U+2015 (`―`)</li><li>a hyphen-minus / U+FF0D (`－`)</li></ul>| 半角のハイフン (`-`) に対応する全角文字<ul><li>ダッシュ (em Dash) / U+2014 (`—`)</li><li>ホリゾンタルバー / U+2015 (`―`)</li><li>全角ハイフンマイナス / U+FF0D (`－`)</li></ul>|
| The corresponding fullwidth character to halfwidth tilde (`~`)<ul><li>a fullwidth tilde / U+FF5E (`～`)</li><li>a wave dash / U+301C (`〜`)</li></ul>| 半角のチルダ (`~`) に対応する全角文字<ul><li>全角チルダ / U+FF5E (`～`)</li><li>波ダッシュ / U+301C (`〜`)</li></ul>|
| The corresponding fullwidth character to halfwidth full stop (`.`)<ul><li>a fullwidth full stop (`．`)</li><li>an ideographic full stop (`。`)</li></ul>| 半角のピリオド (`.`) に対応する全角文字<ul><li>全角ピリオド (`．`)</li><li>句点 (`。`)</li></ul>|
| The corresponding fullwidth character to halfwidth comma (`,`)<ul><li>a fullwidth comma (`，`)</li><li>an ideographic comma (`、`)</li></ul>| 半角のコンマ (`,`) に対応する全角文字<ul><li>全角コンマ (`，`)</li><li>読点 (`、`)</li></ul>|


## Licence

MIT Licence

## Contribution
[Github Repository](https://github.com/mo-san/Zenkaku-Hankaku)

## Release Notes

- 0.0.1 / 2020-04-28<br>Initial release
