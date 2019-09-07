export const removePassword = usr => {
  const usrObj = usr.toObject();
  delete usrObj.hashedPassword;
  return usrObj;
};
