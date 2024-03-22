const BanDisplayList = ({banSol, banCamOnC, banCamOnO, banCamOnS, banRovers, removeBan}) => {
    return(
        <div className="list-body">
            <h2>List of Bans</h2>
            <h4>Banned Sol</h4>
            <div className="list-banned">
                {banSol &&
                    banSol.map((sol,index) => (
                        <li className="ban-element" key={index}>
                            <button className="ban-button" onClick={() => removeBan("sol",sol)}>
                                {sol}
                            </button>
                        </li>
                    ))
                }
            </div>
            <h4>Banned Cameras On Curiosity</h4>
            <div className="list-banned">
                {banCamOnC &&
                    banCamOnC.map((cam,index) => (
                        <li className="ban-element" key={index}>
                            <button className="ban-button" onClick={() => removeBan("camC", cam)}>
                                {cam}
                            </button>
                        </li>
                    ))
                }
            </div>
            <h4>Banned Cameras On Opportunity</h4>
            <div className="list-banned">
                {banCamOnO &&
                    banCamOnO.map((cam,index) => (
                        <li className="ban-element" key={index}>
                            <button className="ban-button" onClick={() => removeBan("camO", cam)}>
                                {cam}
                            </button>
                        </li>
                    ))
                }
            </div>
            <h4>Banned Cameras On Spirit</h4>
            <div className="list-banned">
                {banCamOnS &&
                    banCamOnS.map((cam,index) => (
                        <li className="ban-element" key={index}>
                            <button className="ban-button" onClick={() => removeBan("camS", cam)}>
                                {cam}
                            </button>
                        </li>
                    ))
                }
            </div>
            <h4>Banned Rovers</h4>
            <div className="list-banned">
                {banRovers &&
                    banRovers.map((rov,index) => (
                        <li className="ban-element" key={index}>
                            <button className="ban-button" onClick={() => removeBan("rov", rov)}>
                                {rov}
                            </button>
                        </li>
                    ))
                }
            </div>
        </div>
    )
}

export default BanDisplayList;