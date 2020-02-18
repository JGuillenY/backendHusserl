<?
/**
 * In this file, you can set up 'the main config' for the whole framework
 * generator.
 * @package snfm
 * @subpackage snfm.config
 * @Author Cake development Team
 */
//VARIABLES DE AMBIENTE
$ROOT="/home/clafenor/public_html/diccionariohusserl/es/";//RAIZ DEL SISTEMA DE ARCHIVOS DONDE ESTA UBICADO EL SISTEMA
$URL='//www.clafen.org/diccionariohusserl/es/';       //URL DEL SISTEMA
$BASEDIR="."; 					//DIRECTORIO BASE
$WEBMASTER="azirionq@yahoo.com.mx";	//A QUIEN COMMUNICARSE EN CASO DE PROBLEMAS
$THEME="default";				//TEMA DEL SITIO
$ICON="";				//ICONO DEL TITULO
$FROM="zirion@securenet.com.mx"; 


//VARIABLES DEL MENU
$TITLE="Diccionario Husserl";	//TITULO QUE APARECE EN EL NAVEGADOR
$DIVTITLE="font-face: bold; font-family: berliner,arial,sans-serif,helvetica;font-size: 17px;color: #521410;";
$MENUFOOTER="<br><div align='center'><a href='../de/'><div class=normal>Deutsche Version</div>
		<img src='public/de.gif' border='0' height='30' width='40'/>
		</a></div>";


//VARIABLES DE LA BASE DE DATOS
$DB['DRIVER']="mysql";				//TIPO DE BASE DE DATOS (ORACLE,MySQL,PostgreSQL)
$DB['SERVER']="localhost";                      //SERVIDOR AL QUE NOS CONETAREMOS
$DB['USER']="clafenor_termuse";                          //USUARIO
$DB['PASSWORD']="Fen0menolog1a";                     //PASSWORD
$DB['DATABASE']="clafenor_terminos";


//MODULES
$EDITOR=1;					//NULL=no editor 1=Editor


//ACCESS CONTROL
$ACL="2";					//0=no acl, 1=ACL by framework, 2=ACL by applicaction


//END MODULES

//NOFRAMES
$DIVWIDTH="15%";				//MENUWIDTH

//FRAMES
$FRAMES=0;					//1 USO DE FRAMES. 0 No uso. Si el menu es grande usar FRAMES
$leftFrames=320;				//Espacio del FRAME IZQUIERDO
$bSize=1;					//TAMAÑO DEL MARCO


###########################################################################################################
//NO EDITAR DESPUES DE ESTE PUNTO
###########################################################################################################
define ('ROOT', $ROOT);
define ('URL',$URL);
define ('BASEDIR',"$BASEDIR/views/");
define ('IMGDIR',"$URL/libs/img/");
define ('APPLIBSURL',"$URL/app/applibs/");
define ('APPLIBSROOT',"$ROOT/app/applibs/");
define('DS', DIRECTORY_SEPARATOR);
define ('FROM',$FROM);

//define ('ROOT', dirname(__FILE__).DS);

require "tags.php";
require "headerscripts.php";
?>