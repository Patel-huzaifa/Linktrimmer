export async function GET() {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      return Response.json({
        success: false,
        error: true,
        message: "MONGODB_URI not found in environment variables",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Parse the URI to check its format (without connecting)
    const uriParts = {
      hasProtocol: uri.startsWith('mongodb+srv://'),
      hasUsername: uri.includes('@'),
      hasCluster: uri.includes('.mongodb.net'),
      hasDatabase: uri.includes('/linktrimer'),
      hasOptions: uri.includes('?'),
      length: uri.length
    };

    // Check for common issues
    const issues = [];
    if (!uriParts.hasProtocol) {
      issues.push("URI should start with 'mongodb+srv://'");
    }
    if (!uriParts.hasUsername) {
      issues.push("URI should include username and password");
    }
    if (!uriParts.hasCluster) {
      issues.push("URI should include cluster address");
    }
    if (!uriParts.hasDatabase) {
      issues.push("URI should include database name '/linktrimer'");
    }

    return Response.json({
      success: true,
      message: "URI format analysis",
      uriFormat: uriParts,
      issues: issues,
      hasIssues: issues.length > 0,
      // Don't expose the full URI for security
      uriPreview: uri.substring(0, 20) + "..." + uri.substring(uri.length - 20),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return Response.json({
      success: false,
      error: true,
      message: "Error analyzing URI",
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 