var cameraObject : GameObject;
@HideInInspector
var targetXRotation : float;
@HideInInspector
var targetYRotation : float;
@HideInInspector
var targetXRotationV : float;
@HideInInspector
var targetYRotationV : float;

var rotateSpeed : float = 0.2;

var holdHeight : float = - 0.5;
var holdSide : float = 0.5;

function Start () {

}

function Update () 
{
	transform.position = cameraObject.transform.position + Quaternion.Euler(0, targetYRotation, 0) * Vector3(holdSide, holdHeight, 0);
}