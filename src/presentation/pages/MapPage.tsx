import { dummyProjects } from "../../data/data";
import ProjectList from "../components/ProjectList";

function MapPage() {
    return (
        <div>
            <div className="relative bg-[url(/map.png)] bg-no-repeat bg-cover h-[70vh] mb-4">
                <div className="absolute top-[55%] left-[10%] flex items-start">
                    <img src="/grader.png" alt="grader" className="w-20" />
                    <div className="w-full bg-green-500 text-center text-xs font-semibold p-2 rounded absolute bottom-full left-full ml-2">
                        <p>MOV</p>
                        <p>3,4 km/h</p>
                        <p>xxx secs</p>
                    </div>
                </div>

                <div className="absolute top-[55%] right-[10%] flex items-start">
                    <img src="/grader.png" alt="grader" className="w-20" />
                    <div className="w-full bg-green-500 text-center text-xs font-semibold p-2 rounded absolute bottom-full left-full ml-2">
                        <p>MOV</p>
                        <p>3,4 km/h</p>
                        <p>xxx secs</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6">
                {/* <ProjectList projects={dummyProjects} /> */}
            </div>
        </div>
    );
}

export default MapPage;
