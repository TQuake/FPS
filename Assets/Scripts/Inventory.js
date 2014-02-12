var song : AudioClip;
private var coatOpen : boolean = false;

function Update () {
//Coat Inventrory
	if (Input.GetKeyDown ("e"))
		{
			coatOpen = true;
		}
	if (Input.GetKeyUp ("e"))
		{
			coatOpen = false;
		}
}

function OnGUI () {
	if (coatOpen == true) {
		(GUI.Button (Rect (10,10,150,100), "Button")); {
			print ("You clicked the button!");
		}
	}
}