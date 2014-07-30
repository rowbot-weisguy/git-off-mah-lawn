#pragma strict

function Start () {

}

function Update() {
	
}

function OnTriggerEnter (col: Collider) {
	if (gameObject.tag == "Default Bullet" || gameObject.tag == "Enemy Bullet") {
		if (col.gameObject.tag == "Border") {
				Destroy(gameObject);
		
			}
	}
}	