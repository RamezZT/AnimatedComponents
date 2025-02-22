import Modal from "../components/modals/Modal";
import "./index.css";
const ModalExample = () => {
  return (
    <div className="min-h-screen flex items-center justify-center transition-all">
      <Modal>
        <div className="flex justify-center gap-2">
          <Modal.Open>
            <button className="btn-primary hover:!text-white">Open</button>
          </Modal.Open>
        </div>
        <Modal.Window styles="text-black rounded-2xl p-8 bg-white min-w-[200px] min-h-[200px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Animated Modal 🎉🎉</h1>
            <p className="font-semibold text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            {/* any click inside these will result in closing the modal */}
            <Modal.Close styles="">
              <button className="btn">Close</button>
            </Modal.Close>
            <button className="btn-primary">Submit</button>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default ModalExample;
