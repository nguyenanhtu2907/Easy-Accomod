const getAPI = async () => {
  const response = await fetch(
    "https://dc.tintoc.net/app/api-customer/public/districts"
  );
  const districts = response.json();
  try {
    districts.then((district) => {
      console.log(district);
    });
  } catch (error) {
    console.log(error);
  }
};
getAPI();
