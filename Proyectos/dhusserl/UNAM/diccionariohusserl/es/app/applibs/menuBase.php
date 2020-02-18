<?
/**
* This function must not be touched in name. It is necesary to create a menu for the interface.
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
function baseMenu(){
	$tmp = new menuSite();
	$tmp->addNode(1,"Alem&aacute;n","","Alem&aacute;n-Espa&ntilde;ol");
	$tmp->addNode(2,"&Iacute;ndice",$tmp->menuLink("DeIndice"),"&Iacute;ndice");
	$tmp->addNode(2,"B&uacute;squeda",$tmp->menuLink("DeBusqueda"),"B&uacute;squeda");
	$tmp->addNode(1,"Espa&ntilde;ol","","Espa&ntilde;ol-Alem&aacute;n");
	$tmp->addNode(2,"&Iacute;ndice",$tmp->menuLink("EsIndice"),"&Iacute;ndice");
	$tmp->addNode(2,"B&uacute;squeda",$tmp->menuLink("EsBusqueda"),"B&uacute;squeda");
	$tmp->addNode(1,"Gu&iacute;a de uso",$tmp->menuLink("Guia"),"Gu&iacute;a");
	$tmp->addNode(1,"Proyecto DH",$tmp->menuLink("Proyecto"),"Proyecto DH");
	$tmp->addNode(1,"Opciones",$tmp->menuLink("options"),"Opciones");
	$tmp->addNode(1,"Administraci&oacute;n",$tmp->menuLink("Administracion"),"Administraci&oacute;n");
	$tmp->addNode(1,"Salir",$tmp->menuLink("logout"),"Salida");
	return $tmp;
}
?>
