import React from "react";
function AboutPage() {
    return (
        <div className="about-cont bg-light text-light mt-5">
            {/* Hero section */}
            <section>
                <div className="row"></div>
                <div className="container text-center mt-5">
                    <h1 className="">About ARGO Ocean Data Explorer</h1>
                    <p>
                        AI-powered platform for discovering, analyzing, and visualizing ARGO ocean datasets.
                    </p>
                </div>
            </section>
            {/* Project description */}
            <section>
                <div className="container text-center">
                    <h2 className="fw-semibold mb-4">Our Mission </h2>
                    <p className="fs-5">
                        Oceans drive Earth’s climate system. The ARGO project provides critical ocean
                        temperature, salinity, and depth profiles from thousands of floats worldwide.
                        <br />
                        Our tool makes this data interactive and accessible using conversational AI and
                        visualization.
                    </p>
                </div>
            </section>
            {/* Team */}
            <section>
                <div className="container text-center">
                    <h2 className="fw-semibold mt-4">Our Team ⭐</h2>
                    <div className="row mt-5">
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Dhruv chaudhary</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Chitransh Gaur</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Akash Yadav</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Ashutosh Kumar singh</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Bhumika Jain</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{width: "18rem" , height:"20rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Diksha Sisodia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hackathon Info */}
            <section className="bg-light py-4 text-center border-top mt-5 text-dark">
                <div className="container mt-5">
                    <h4 className="fw-semibold">Smart India Hackathon 2025</h4>
                    <p className="mb-0">Problem Statement ID: XYZ123 | Team: ABCD</p>
                </div>
            </section>

        </div>
    );
}

export default AboutPage;