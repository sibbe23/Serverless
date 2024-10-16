const { Vendor } = require('./models/vendor');

module.exports.createVendor = async (event) => {
  const { name, address } = JSON.parse(event.body);
  try {
    const newVendor = await Vendor.create({ name, address });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Vendor created', VendorId: newVendor.id }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating Vendor', error: error.message }),
    };
  }
};
module.exports.getVendor = async (event) => {
  const { id } = event.pathParameters;

  try {
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Vendor not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(vendor),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching Vendor', error: error.message }),
    };
  }
};

module.exports.updateVendor = async (event) => {
  const { id } = event.pathParameters;
  const { name, address } = JSON.parse(event.body);

  try {
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Vendor not found' }),
      };
    }

    vendor.name = name;
    vendor.address = address;
    await vendor.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Vendor updated' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating Vendor', error: error.message }),
    };
  }
};

module.exports.deleteVendor = async (event) => {
  const { id } = event.pathParameters;

  try {
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Vendor not found' }),
      };
    }

    await vendor.destroy();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Vendor deleted' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting Vendor', error: error.message }),
    };
  }
};

module.exports.getAllVendors = async () => {
  try {
    const vendors = await Vendor.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(vendors),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching Vendors', error: error.message }),
    };
  }
};
