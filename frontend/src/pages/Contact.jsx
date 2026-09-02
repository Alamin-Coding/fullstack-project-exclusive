import { useEffect, useState } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { IoCallOutline } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import Button from "../components/Button";
import axios from "axios";

const Contact = () => {
  const [contact, setContact] = useState({
    phoneLabel: "Call To Us",
    phoneText: "We are available 24/7, 7 days a week.",
    phone: "+8801611112222",
    emailLabel: "Write To US",
    emailText: "Fill out our form and we will contact you within 24 hours.",
    email1: "customer@exclusive.com",
    email2: "support@exclusive.com",
  })

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
      if (data.site?.contact) setContact((prev) => ({ ...prev, ...data.site.contact }))
    }).catch(console.log)
  }, [])

  return (
    <>
      <Container>
        <div className="lg:my-20 my-5">
          <BreadCrumb />
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-10 font-poppins">
          <div className="shadow p-10 rounded-sm w-85 mx-auto">
            <span className="flex items-center gap-3 text-2xl font-medium mb-6">
              <div className="text-white p-2.5 bg-primary rounded-full flex justify-center items-center">
                <IoCallOutline />
              </div>
              <h2>{contact.phoneLabel}</h2>
            </span>
            <p className="py-4 text-sm">{contact.phoneText}</p>
            <h2 className="text-sm">Phone: {contact.phone}</h2>
            <div className="border-b-2 border-secondary my-8"></div>

            <span className="flex items-center gap-3 text-2xl font-medium mb-6">
              <div className="text-white p-2.5 bg-primary rounded-full flex justify-center items-center">
                <SlEnvolopeLetter />
              </div>
              <h2>{contact.emailLabel}</h2>
            </span>
            <p className="py-4 text-sm">{contact.emailText}</p>
            <h2 className="pb-4 text-sm">Emails: {contact.email1}</h2>
            <h2 className="text-sm">Emails: {contact.email2}</h2>
          </div>

          <div className="shadow px-7.75 py-10 lg:w-200 w-85 mx-auto rounded-sm">
            <div className="flex lg:flex-row flex-col gap-4">
              <div>
                <input type="text"
                  placeholder="Your Name *"
                  className="bg-[#f5f5f5] py-3.25 px-4 w-full rounded-sm outline-0" required />
              </div>
              <div>
                <input type="text"
                  placeholder="Your Email *"
                  className="bg-[#f5f5f5] py-3.25 px-4 w-full rounded-sm outline-0" required />
              </div>
              <div>
                <input type="text"
                  placeholder="Your Phone *"
                  className="bg-[#f5f5f5] py-3.25 px-4 w-full rounded-sm outline-0" required />
              </div>
            </div>
            <div className="pt-10.25">
              <input type="text"
                placeholder="Your Massage"
                className="bg-[#f5f5f5] h-51.75 w-full px-4 rounded-sm outline-0" />
            </div>
            <div className="flex justify-end">
              <Button className='py-4 px-12 mt-8 bg-primary hover:bg-[#a90808] rounded-sm'>Send Massage</Button>
            </div>
          </div>
        </div>

      </Container>
    </>
  )
}

export default Contact;
