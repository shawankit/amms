const DeleteEntityById = require("test/data/delete-entity-by-id");
const CreateUserQuery = require("../../resources/users/queries/create-user-query");
const { User , Role  ,UserRole } = require("./../../models");
const definations = require("test/data/factory").factory;

const dontBuild = () => new Promise((resolve, reject) => resolve({}));

const idWhenPresent = (entity) => (entity ? entity.id : null);

const whenPresent = (entity, successArgs) => (entity ? successArgs : []);

const deleteWhenPresent = (entity) =>
  whenPresent(entity, [new DeleteEntityById([idWhenPresent(entity)])]);

const doNothing = () => [];

const entity = async (name, replace) =>
  new Promise(async (resolve, reject) => {
    let data = await definations.build(name);
    if (replace) {
      data = replace(data);
    }
    resolve(data);
  });

const buildEntity = (name) => entity(name);

const returnObject = (args) => args;

const user = {
  name: "user",
  create: ({id,fullName,email,password,mobile}) => [
    new CreateUserQuery(id,fullName,email,password,mobile)
  ],
  build: () => entity("user"),
  delete: (user) => [new DeleteEntityById(user.id, "User")],
};


const role = {
  name: "role",
  create: (role) => [],
  build: () => entity("role"),
  delete: (role) => [new DeleteEntityById(role.id, "Role")],
};

const google_auth = {
  name: "google_auth",
  create: (google_auth) => [
    new CreateGoogleAuthQuery({
      id: google_auth.id,
      google_id: google_auth.google_id,
      email: google_auth.email,
      profile_url: google_auth.profile_url,
      user_id: google_auth.user.id,
    }),
  ],
  build: () => entity("google_auth"),
  dependency: [[(google_auth) => google_auth.user, user]],
  delete: (google_auth) => [new DeleteEntityById(google_auth.id, "GoogleAuth")],
};
const mobile_auth = {
  name: "mobile_auth",
  create: (mobile_auth) => [
    new CreateUserOtpQuery(
      mobile_auth.id,
      mobile_auth.mobile,
      mobile_auth.otp,
      mobile_auth.expired_at
    ),
  ],
  build: () => entity("mobile_auth"),
  delete: (mobile_auth) => [new DeleteEntityById(mobile_auth.id, "MobileAuth")],
};
const user_email = {
  name: "user_email",
  create: (user_email) => [
    new CreateEmailQuery({
      id: user_email.id,
      email: user_email.email,
      user_id: user_email.user.id,
    }),
  ],
  dependency: [[(user_email) => user_email.user, user]],
  build: () => entity("user_email"),
  delete: (user_email) => [new DeleteEntityById(user_email.id, "Email")],
};
// const role = {
//   name: "role",
//   create: (role) => [
//     new CreateRoleQuery(
//       role.id,
//       role.name,
//     ),
//   ],
//   build: () => entity("role"),
//   delete: (role) => [new DeleteEntityById(role.id, "Role")],
// };

const service = {
  name: "service",
  create: (service) => [
    new CreateServiceQuery({
      id: service.id,
      name: service.name,
      description: service.description,
      detailed_description: service.detailed_description,
      base_price: service.base_price,
      service_sub_category_id: service.service_sub_category_id
    })
  ],
  dependency: [],
  build: () => entity("service"),
  delete: (service) => [new DeleteEntityById(service.id, "Service")],
};

const organisation = {
  name: "organisation",
  create: (organisation) => [
    new CreateOrganisationQuery({
      id: organisation.id,
      name: organisation.name,
      organisation_status: organisation.organisation_status,
    })
  ],
  dependency: [],
  build: () => entity("organisation"),
  delete: (organisation) => [new DeleteEntityById(organisation.id, "Organisation")],
};

const service_category = {
    name: "service_category",
    create: (serviceCategory) => [
      new CreateServiceCategoryQuery({
        id: serviceCategory.id,
        name: serviceCategory.name,
        icon_url: serviceCategory.icon_url,
        type: serviceCategory.type,
        status: serviceCategory.status
      })
    ],
    dependency: [],
    build: () => entity("service_category"),
    delete: (service) => [new DeleteEntityById(service.id, "ServiceCategory")],
  };
const idea = {
  name: "idea",
  create: (idea) => [
    new CreateIdeaQuery({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      thumbnail_id: idea.thumbnail_id,
      status: idea.status,
      slug: idea.slug,
      created_by: idea.created_by,
    })
  ],
  dependency: [],
  build: () => entity("idea"),
  delete: (idea) => [new DeleteEntityById(idea.id, "idea")],
}

const contentMedia = {
  name: "contentMedia",
  create: (contentMedia) => [
    new CreateContentMediaQuery({
      id: contentMedia.id,
      url: contentMedia.url,
      type: contentMedia.type,
      order: contentMedia.order,
      contentable_id: contentMedia.contentable_id,
      contentable_type: contentMedia.contentable_type
    })
  ],
  dependency: [],
  build: () => entity("contentMedia"),
  delete: (contentMedia) => [new DeleteEntityById(contentMedia.id, "contentMedia")],
};

const pricingDetail = {
  name: "contentMedia",
  create: (pricingDetail) => [
    new CreateContentMediaQuery({
      id: pricingDetail.id,
      total_price: pricingDetail.total_price,
      currency: pricingDetail.currency,
      price_breakup: pricingDetail.price_breakup,
      contentable_id: pricingDetail.contentable_id,
      contentable_type: pricingDetail.contentable_type
    })
  ],
  dependency: [],
  build: () => entity("pricingDetail"),
  delete: (pricingDetail) => [new DeleteEntityById(pricingDetail.id, "pricingDetail")],
};


const zone = {
  name: "zone",
  create: (zone) => [
    new CreateZoneQuery({
      id: zone.id,
      name: zone.name,
      status: zone.status,
      geo_location: zone.geo_location
    })
  ],
  dependency: [],
  build: () => entity("zone"),
  delete: (zone) => [new DeleteEntityById(zone.id, "Zone")],
};

module.exports = {
  buildEntity,
  user,
  role,
  google_auth,
  mobile_auth,
  user_email,
  role,
  service,
  service_category,
  idea,
  contentMedia,
  pricingDetail,
  zone,
  organisation
};
