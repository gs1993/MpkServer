﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiServer.Postman
{
    public class PostmanCollection
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public long timestamp { get; set; }
        public Collection<PostmanRequest> requests { get; set; }
    }
}
