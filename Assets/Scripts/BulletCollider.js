#pragma strict

function Start () {

}

function Update() {
	
}

function OnTriggerEnter (col: Collider) {
	if (gameObject.tag == "Default Bullet" || gameObject.tag == "Enemy Bullet") {
		if (col.gameObject.tag == "Remove Border") {
				Destroy(gameObject);
		
			}
	}
}	