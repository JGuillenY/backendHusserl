<?

if(($_GET['exec'])=="pass"){
		echo "<div class=\"normaltitle\">".$this->text['changepass']."</div><br>";
		echo "<div class=\"titlebox\"><table border=\"0\"><tr><td>";
		echo $this->changePassForm();
		echo "</td></tr></table></div>";
}
elseif($_GET['exec']){}
else{
	echo "<table border=\"0\" width=99%><tr><td width=100%>";
	$code="<br><div class=\"maintitle\">".$this->text['accountconfig']."</div><br>\n";
	$this->drawTitle($code);
	echo "</td></tr></table>";
	echo "<table border=\"0\" width=\"99%\"><tr><td width=\"20%\" valign=\"top\">";
	$this->showUserMenu();
	echo "</td><td border=\"1\" align=\"left\" valign=\"left\" class=\"datatbl\">";
	$url=$this->html->here."&ESCAPE=1&exec=default";
	echo "<iframe name=\"datamain\" src=\"$url\" width=\"745\" height=\"498\"
			marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"auto\"></iframe>";
	echo "</td></tr></table>";
}

?>
