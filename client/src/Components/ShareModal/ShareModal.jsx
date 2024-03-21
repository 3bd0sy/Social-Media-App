import PostShare from "../PostShare/PostShare";
import "./ShareModal.css";

export default function ShareModal({ modalOpened, setModalOpened }) {

    if (modalOpened) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className="modal-continer">
                {modalOpened && (
                    <div className="modal">
                        <div onClick={() => setModalOpened(false)} className="overlay"></div>
                        <div className="modal-content">

                            <PostShare />

                            <button className="close-modal" onClick={() => setModalOpened(false)}>
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}