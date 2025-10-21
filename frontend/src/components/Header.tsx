import Link from "next/link";
import Image from "next/image";
import HeaderImage from "../favicon.ico";
import "../styles/custom.css";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function Header() {

    return (
        <header className="flex justify-around p-4 items-center border-b border-gray-300">
            <div>
                <Link 
                    href={"/"}
                >
                    <Image
                        src={HeaderImage}
                        alt={"Header Image"}
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
            <div>
                <nav>
                    <ul className="flex space-x-8">
                        <li className="header-link-button">
                            <Link 
                                href={"/planner"}
                            >
                                Itinerary Planner
                            </Link>
                        </li>
                        <li className="header-link-button">
                            <Link 
                                href={"/trips"}
                            >
                                Suggested Trips
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <button 
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                >
                    {"dark" === "dark" ? <BsSunFill /> : <BsMoonFill />}
                </button>
            </div>
        </header>
    );
}