using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BLSTree.Startup))]
namespace BLSTree
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
