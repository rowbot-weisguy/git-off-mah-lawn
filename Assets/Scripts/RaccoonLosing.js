#pragma strict
var skin : GUISkin;
var string : String = "Damn Button";
private var retryPosition : Rect = new Rect(50,200,100,50);
var buttonImage : Texture2D;

function Start () {

}

function Update () {

}

function OnGUI(){
	GUI.skin = skin;
	
	GUI.Label(Rect(20, 20, 1000, 500), "YOU LOSE");
	if (GUI.Button(retryPosition, buttonImage)) {
//		Application.LoadLevel("Still House");
	}
}
