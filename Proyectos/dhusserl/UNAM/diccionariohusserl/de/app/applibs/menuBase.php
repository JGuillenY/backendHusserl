<?
/**
* This function must not be touched in name. It is necesary to create a menu for the interface.
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
function baseMenu(){
	$tmp = new menuSite();
	$tmp->addNode(1,"Deutsch","","Deutsch-Spanisch");
	$tmp->addNode(2,"Index",$tmp->menuLink("DeIndice"),"Index");
	$tmp->addNode(2,"Suche",$tmp->menuLink("DeBusqueda"),"Suche");
	$tmp->addNode(1,"Spanisch","","Spanisch-Deutsch");
	$tmp->addNode(2,"Index",$tmp->menuLink("EsIndice"),"Index");
	$tmp->addNode(2,"Suche",$tmp->menuLink("EsBusqueda"),"Suche");
	$tmp->addNode(1,"Anleitung",$tmp->menuLink("Guia"),"Anleitung");
	$tmp->addNode(1,"DH-Projekt",$tmp->menuLink("Proyecto"),"DH-Projekt");
	$tmp->addNode(1,"Optionen",$tmp->menuLink("options"),"Optionen");
	$tmp->addNode(1,"Administration",$tmp->menuLink("Administracion"),"Administration");
	$tmp->addNode(1,"Ausgang",$tmp->menuLink("logout"),"Ausgang");
	return $tmp;
}
?>
