"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
  // Simulate processing sending email and text
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  // Log to mock the server sending email/SMS
  console.log(`[ACTION: SEND EMAIL & SMS]`);
  console.log(`To: ${name} <${email}>, Tel: ${phone}`);
  console.log(`Subject: Welcome to Shreetej Properties Builders & Developers - Brochure Attached`);
  console.log(`Body: Thank you for connecting with us. Please find our comprehensive project brochure attached.`);

  return { 
    success: true, 
    message: "Thank you for connecting with us! We have sent a confirmation message and property brochure to your email and phone." 
  };
}
