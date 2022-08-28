const { factory } = require("factory-girl");

const loadFactory = async () => {
  factory.define("user", Object, {
    id: factory.chance("guid"),
    fullName: factory.chance("name"),
    mobile: factory.chance("phone", { mobile: true }),
    email: factory.chance("email"),
    password : factory.chance('word'),
    countryCode: factory.chance("integer", { min: 1, max: 1000 }),
  });

  factory.define("aadhar", Object, {
    id: factory.chance("guid"),
    aadharNumber: factory.chance('natural'),
    name: factory.chance("name"),
    user : factory.assocAttrs('user')
  });

  factory.define("address", Object, {
    id : factory.chance("guid"),
    name : factory.chance('name'),
    city : factory.chance("city"),
    street : factory.chance("street"),
    country : factory.chance("country"),
    user : factory.assocAttrs('user')
  });

  factory.define("role", Object, {
    id: factory.chance("guid"),
    name: factory.chance('name'),
  });

  factory.define("userrole", Object, {
    id: factory.chance("guid"),
    role : factory.assocAttrs('role'),
    user : factory.assocAttrs('user')
  });

  factory.define("google_auth", Object, {
    id: factory.chance("guid"),
    google_id: factory.chance("guid"),
    profile_url: factory.chance("string"),
    email: factory.chance("email"),
    user: factory.assocAttrs("user"),
  });

  factory.define("mobile_auth", Object, {
    id: factory.chance("guid"),
    mobile: factory.chance("phone", { mobile: true }),
    otp: factory.chance("string", { alpha: true }),
    expired_at: factory.chance("date"),
  });

  factory.define("user_email", Object, {
    id: factory.chance("guid"),
    email: factory.chance("email"),
    user: factory.assocAttrs("user"),
  });

  factory.define("service", Object, {
    id: factory.chance("guid"),
    name: factory.chance("name"),
    base_price: 23,
    service_sub_category_id: factory.chance("guid"),
    description: 'some description',
    detailed_description: 'some detailed descriptions here',
  });

  factory.define("organisation", Object, {
    id: factory.chance("guid"),
    name: factory.chance("name"),
    organisation_status: 'inactive',
  });

  factory.define("service_category", Object, {
    id: factory.chance("guid"),
    name: factory.chance("name"),
    icon_url: factory.chance("url"),
    type: 'Services',
    status: 'Active'
  });
  
  factory.define("idea", Object, {
    id: factory.chance("guid"),
    title: "title",
    description: 'some description',
    thumbnail_id: factory.chance("guid"),
    status: "Published",
    slug: "slug",
    created_by: factory.chance("guid"),
  });

  factory.define("contentMedia", Object, {
    id: factory.chance("guid"),
    url: 'image url',
    type: 'type',
    order: factory.chance("integer", { min: 1, max: 1000 }),
    contentable_id: factory.chance("guid"),
    contentable_type: 'contentable_type'
  });

  factory.define("pricingDetail", Object, {
    id: factory.chance("guid"),
    total_price: '10000',
    price_breakup: {},
    currency: 'currency',
    contentable_id: factory.chance("guid"),
    contentable_type: 'contentable_type'
  });

  factory.define("zone", Object, {
    id: factory.chance("guid"),
    name: 'zone name',
    status: 'Active',
    geo_location: {
      type: 'Polygon',
      coordinates: [
        [
          [1.223432343, 2.34323243232],
          [1.22343432343, 2.3432334243232],
          [1.223433432343, 2.3432334243232],
          [1.223432343, 2.34323243232]
        ]
      ],
      crs: {
           properties: {
              name: "EPSG:3857"
            },
            type: "name"
          }
    }
  });

};

module.exports.factory = factory;
module.exports.loadFactory = loadFactory;
