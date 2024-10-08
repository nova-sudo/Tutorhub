import React, { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission logic here
        console.log(formData); // For demonstration purposes, logging form data
    };

   

    return (
        <div className="container mx-auto px-4 py-8 overflow-scroll">
            <h1 className="text-5xl font-bold text-center mb-8">Contact Us</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="4"
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-400 text-white rounded-md py-2 px-4 transition duration-300"
                >
                    Submit
                </button>
            </form>
           
        </div>
    );
}

export default Contact;
