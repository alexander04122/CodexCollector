using System.Collections.Generic;

namespace CodexCollector.Core.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Level { get; set; }
        public string Link { get; set; }
        public List<string> Tags { get; set; }
    }
}
