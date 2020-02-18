<html>
<head>
<TITLE>Diccionario Husserl</TITLE>
    <STYLE type="text/css">
       BODY { 
		background-image: url("public/background.jpg");
		background-repeat: repeat;
		background-position: center;
       }
    </STYLE>
    		<link rel="stylesheet" href="<?echo URL?>/libs/themes/default.css" type="text/css"></link>
</head>
<body>
<div align='center'>
<table border="0" class="registromain" width='70%' height='500px'>
<tr><td align='right' valign='top'>
<a href='<?echo URL."../de/?action=siteaccess"?>'><span class='normal'>Deutsche Version</span>  <img src='public/de.gif' border='0' height='15' width='20'/></a><br>
<a href='<?echo URL."../es/?action=siteaccessenglish"?>'><span class='normal'>English Version</span>  <img src='public/en.gif' border='0' height='15' width='20'/></a>


</div>				
</td></tr>
<tr>
<td align='center' valign='top'>

<div align="center" style="font-family: berliner,arial,sans-serif,helvetica;font-size: 155%;color: BLACK; text-align: center; align: center;"> 
<em class='husserl'><?echo $this->text['diccionario']?></em>

</div><br

<div  class='husserlsmall'> <em class='husserl'>
<?echo $this->text['definition'] ?>
</em><br><br>
</div>

<?
if($this->recover){
	echo $this->showRecover();
}
else echo $this->showForm();
?>
</td></tr>
<tr><td >

<?echo $this->text['footer1'];?>
<br>
<?echo $this->text['footer2'];?>


</td></tr>

</table>
</div>
</body>
</html>
