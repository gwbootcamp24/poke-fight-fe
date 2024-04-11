import Button from "../ui/Button.jsx";

function Startpage() {
  return (
    <>
      <div className="startpage">
        Das hier ist die Startpage mit dem Logo in der Mitte
      </div>
      <div>
        <Button text="Start game" url="/lobby" />
      </div>
    </>
  );
}
 
export default Startpage;
