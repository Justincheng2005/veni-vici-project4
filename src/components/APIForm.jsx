const APIForm = ({sol,camName, rovName, imgURL, addBanToS,addBanToC,addBanToR, onSubmit}) => {
    return (
        <div className="query-container">
            {imgURL ? (
                <div>
                    <div className="param-button-container">
                        <button type="submit" className="param-buttons" onClick={addBanToS}>
                            {sol}
                        </button>
                        <button type="submit" className="param-buttons" onClick={addBanToC}>
                            {camName + " on " + rovName}
                        </button>
                        <button type="submit" className="param-buttons" onClick={addBanToR}>
                            {rovName}
                        </button>
                    </div>
                    <img className="query-image" src={imgURL} alt="image"/>
                </div>
            ) : (
                <div> </div>
            )}
            <button type="submit" className="discover-button" onClick={onSubmit}>
                Discover
            </button>
        </div>
    )
}

export default APIForm;