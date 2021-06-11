const useCustomerMapper = (data: any) => {
  console.log('Mapper', data)
  const user = data[0]
  return user
    ? {
        email: user.email,
        name: user.name,
        userType: user.userTypeId.name,
        _id: user._id,
      }
    : null
}

export default useCustomerMapper
