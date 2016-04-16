﻿using System;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Core.Logger;
using WebApiServer.Postman;

namespace WebApiServer.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class PostmanController : ApiController
    {
        public PostmanController(ILogger logger)
        {
            logger.Log("init Postman Api Controller");
            logger.Log("Postman api at http://localhost:50000/Postman/Get see postman for more info");
        }
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            var collection = Configuration.Properties.GetOrAdd("postmanCollection", k =>
            {
                var requestUri = Request.RequestUri;
                string baseUri = requestUri.Scheme + "://" + requestUri.Host + ":" + requestUri.Port + "";
                var postManCollection = new PostmanCollection();
                postManCollection.id = Guid.NewGuid();
                postManCollection.name = "ASP.NET Web API Service";
                postManCollection.timestamp = DateTime.Now.Ticks;
                postManCollection.requests = new Collection<PostmanRequest>();
                foreach (var apiDescription in Configuration.Services.GetApiExplorer().ApiDescriptions)
                {
                    var request = new PostmanRequest
                    {
                        collectionId = postManCollection.id,
                        id = Guid.NewGuid(),
                        method = apiDescription.HttpMethod.Method,
                        url = baseUri.TrimEnd('/') + "/" + apiDescription.RelativePath,
                        description = apiDescription.Documentation,
                        name = apiDescription.RelativePath,
                        data = "",
                        headers = "",
                        dataMode = "params",
                        timestamp = 0
                    };
                    postManCollection.requests.Add(request);
                }
                return postManCollection;
            }) as PostmanCollection;

            return Request.CreateResponse<PostmanCollection>(HttpStatusCode.OK, collection, "application/json");
        }
    }
}