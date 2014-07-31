#pragma strict
public var shell : GameObject;
private var ejectTimer : float;


function Start () {
	ejectTimer = 15;
}

function Update () {
	EjectShell();

}

function EjectShell () {
	if (CharacterFire.firing == true){
		ejectTimer --;
		if (ejectTimer <= 0) {
			var shell = Instantiate(shell,transform.position,Quaternion.identity);
			shell.rigidbody.AddForce(Vector3.right * Random.Range(100, 100));
			ejectTimer = 15;
		}
	}
}