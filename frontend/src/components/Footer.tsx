import Link from "next/link";
import Image from "next/image";
import "../styles/custom.css";
import FooterImage from "../favicon.ico";

export default function Footer() {
    return (
        <footer className="flex justify-between p-8 items-center border-t border-gray-300">
            <div className="flex space-x-8">
                <Link 
                    href={"https://github.com/alimunfed17/T-P-A/blob/main/README.md"} 
                    className="footer-link"
                >
                    About
                </Link>
                <Link 
                    href={"https://github.com/alimunfed17/T-P-A/blob/main/LICENSE"}
                    className="footer-link"
                >
                    License
                </Link>
                <Link 
                    href={"mailto:alimunfed17@gmail.com"}
                    className="footer-link"
                >
                    Email
                </Link>
                <Link 
                    href={"https://github.com/alimunfed17/T-P-A"}
                
                    className="footer-link"
                >
                    Github
                </Link>
            </div>
            <div>
                <Image 
                    src={FooterImage} 
                    alt={"Footer Image"} 
                    width={50}
                    height={50}
                />
            </div>
        </footer>
    );
}