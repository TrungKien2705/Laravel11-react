import { Link } from "@inertiajs/react";
import React from "react";

function Pagination({ link }) {
    // console.log(link);
    return (
        <nav className="text-center mt-4">
            {link.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || ""}
                    className={`
                    inline-block py-2 px-3 mx-1 rounded-lg text-gray-200 text-xs ${
                        link.active ? "border-blue-600 bg-blue-600" : ""
                    } ${
                        !link.url
                            ? "!text-gray-500 cursor-not-allowed"
                            : "hover:border-blue-600 hover:bg-blue-600"
                    }
                `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}

export default Pagination;
