import Button from "../ui/Button.jsx";

function Startpage() {
  return (
  <div className="startpage">      
    <div>
        Das hier ist die Startpage mit dem Logo in der Mitte
    </div>
    <div>
      <Button text="Start game" url="/lobby" />
    </div>
  </div>
  );
}
 
export default Startpage;
