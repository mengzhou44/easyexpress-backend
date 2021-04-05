function createSendMessage(contact) {
  return `
    <div> 
      <h3>Name:  ${contact.name} </h3>
      <h3>Email: ${contact.email} </h3>
      <p>
           ${contact.message}
      </p>
    </div>    
   `;
}

module.exports = {
  createSendMessage
};
